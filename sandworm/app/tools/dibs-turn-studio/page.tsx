'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, Copy, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { GradientButton } from '@/components/ui/gradient-button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePageStatus } from '@/hooks/use-page-status';
import { useToast } from '@/hooks/use-toast';

import { STAGE_HTML } from './stage-html';

// The stage is the rig itself (drawings, handles, bones), a build artifact from the Dibs rig (see README.md
// here). It loads through srcDoc, a same-origin document that needs no hosting rules (as a public/*.html file
// Vercel's static export redirected it to a missing route). This page owns every control and drives the
// stage through its DibsStudio API.

type View = 'front' | 'side';
type FrontState = { mouth: string | null; eye: string; lookX: number; lookY: number; padsL: boolean; padsR: boolean };
type MixDef = { label: string; lo: string; hi: string; min: number };
type Studio = {
  setView: (v: View) => void;
  front: { presets: string[]; preset: (n: string) => void; set: (p: Partial<FrontState>) => void; get: () => FrontState };
  side: { presets: string[]; mixes: Record<string, MixDef>; preset: (n: string) => Record<string, number>; setMix: (k: string, t: number) => void; get: () => { mix: Record<string, number> } };
  reset: () => void;
  settings: () => unknown;
  load: (o: unknown) => boolean;
  exportPng: () => Promise<Blob>;
  setTheme: (t: string) => void;
};

const EYES = [['open', 'Open'], ['happy', 'Happy'], ['wide', 'Wide'], ['sleepy', 'Sleepy'], ['unsure', 'Unsure'], ['closed', 'Closed']];
const MOUTHS = [['none', 'None'], ['M3', 'Grin'], ['M8', 'Big smile'], ['M1', 'Open'], ['M9', 'Surprised'], ['M10', 'Unsure']];

function ChipGroup({ label, value, items, onChange }: { label: string; value: string; items: string[][]; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
      <ToggleGroup type="single" variant="outline" size="sm" value={value} onValueChange={(v) => v && onChange(v)} className="flex flex-wrap justify-start gap-1.5">
        {items.map(([v, l]) => (
          <ToggleGroupItem key={v} value={v} className="px-3">{l}</ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

function MixSlider({ id, label, lo, hi, min, value, onChange }: { id: string; label: string; lo: string; hi: string; min: number; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <Label htmlFor={id}>{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">{lo} / {hi}</span>
      </div>
      <Slider id={id} min={min} max={1} step={0.01} value={[value]} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

export default function DibsTurnStudioPage() {
  const frame = useRef<HTMLIFrameElement>(null);
  const linked = useRef(false);
  const [studio, setStudio] = useState<Studio | null>(null);
  const [view, setView] = useState<View>('front');
  const [frontPose, setFrontPose] = useState('Rest');
  const [sidePose, setSidePose] = useState('Rest');
  const [face, setFace] = useState<FrontState | null>(null);
  const [mix, setMix] = useState<Record<string, number>>({});
  const [fineOpen, setFineOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();

  const connect = useCallback(() => {
    const win = frame.current?.contentWindow as (Window & { DibsStudio?: Studio }) | null;
    if (!win?.DibsStudio) return false;
    if (linked.current) return true;   // onLoad and the stage's ready message both land here
    linked.current = true;
    const s = win.DibsStudio;
    setStudio(s);
    setFace(s.front.get());
    setMix(s.side.get().mix);
    win.addEventListener('dibschange', ((e: CustomEvent) => { setFace(e.detail.front); setMix(e.detail.side.mix); }) as EventListener);
    return true;
  }, []);

  // the stage can finish loading before React hydrates (missing both onLoad and its ready message), so
  // also look for it on mount and keep trying briefly until it answers
  useEffect(() => {
    const onMsg = (e: MessageEvent) => { if (e.data?.type === 'dibs:ready') connect(); };
    window.addEventListener('message', onMsg);
    let tries = 0;
    const t = setInterval(() => { if (connect() || ++tries > 100) clearInterval(t); }, 150);
    return () => { window.removeEventListener('message', onMsg); clearInterval(t); };
  }, [connect]);

  useEffect(() => { if (studio && resolvedTheme) studio.setTheme(resolvedTheme); }, [studio, resolvedTheme]);

  // paste a copied settings JSON anywhere on the page to load that exact pose
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (!studio) return;
      let o: unknown;
      try { o = JSON.parse(e.clipboardData?.getData('text') ?? ''); } catch { return; }
      if (studio.load(o)) {
        e.preventDefault();
        const v = (o as { view?: View }).view;
        if (v) setView(v);
        setFrontPose(''); setSidePose('');
        toast({ title: 'Settings loaded' });
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [studio, toast]);

  const changeView = (v: string) => { setView(v as View); studio?.setView(v as View); };
  const reset = () => { studio?.reset(); view === 'front' ? setFrontPose('Rest') : setSidePose('Rest'); };
  const copySettings = async () => {
    if (!studio) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(studio.settings(), null, 1));
      toast({ title: 'Settings copied', description: 'Paste them on this page to load the pose again.' });
    } catch {
      toast({ title: 'Copy blocked', description: 'Your browser refused clipboard access.', variant: 'destructive' });
    }
  };
  const exportPng = async () => {
    if (!studio) return;
    try {
      const blob = await studio.exportPng();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `dibs-${view}-${(view === 'front' ? frontPose : sidePose || 'custom').toLowerCase() || 'custom'}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    } catch {
      toast({ title: 'Export failed', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Dibs Turn Studio</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          Pose Dibs from the front or the side and export a transparent PNG. Drag the dots on the character, pick a
          pose, then fine-tune. Built on the Dibs rig: the same art and bones as the Rive files.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={view} onValueChange={changeView}>
          <TabsList>
            <TabsTrigger value="front">Front</TabsTrigger>
            <TabsTrigger value="side">Side</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={reset} disabled={!studio}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
          <Button variant="outline" size="sm" onClick={copySettings} disabled={!studio}><Copy className="mr-2 h-4 w-4" />Copy settings</Button>
          <GradientButton variant="filled" size="sm" onClick={exportPng} disabled={!studio}><Download className="h-3.5 w-3.5" />Export PNG</GradientButton>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-xl border bg-muted">
          <iframe
            ref={frame}
            srcDoc={STAGE_HTML}
            title="Dibs Turn Studio stage"
            className="block aspect-square max-h-[78vh] w-full"
            onLoad={() => { connect(); }}
          />
        </div>

        <Card className="h-fit">
          <CardContent className="space-y-5 pt-6">
            {view === 'front' && studio && face && (
              <>
                <ChipGroup label="Pose" value={frontPose} items={studio.front.presets.map((p) => [p, p])}
                  onChange={(p) => { setFrontPose(p); studio.front.preset(p); }} />
                <ChipGroup label="Eyes" value={face.eye} items={EYES}
                  onChange={(eye) => { setFrontPose(''); studio.front.set({ eye }); }} />
                <ChipGroup label="Mouth" value={face.mouth ?? 'none'} items={MOUTHS}
                  onChange={(m) => { setFrontPose(''); studio.front.set({ mouth: m === 'none' ? null : m }); }} />
              </>
            )}
            {view === 'side' && studio && (
              <ChipGroup label="Pose" value={sidePose} items={studio.side.presets.map((p) => [p, p])}
                onChange={(p) => { setSidePose(p); setMix(studio.side.preset(p)); }} />
            )}

            <Separator />
            <Collapsible open={fineOpen} onOpenChange={setFineOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-between px-0 text-muted-foreground hover:bg-transparent">
                  Fine-tune <ChevronDown className={`h-4 w-4 transition-transform ${fineOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-5 pt-3">
                {view === 'front' && studio && face && (
                  <>
                    <MixSlider id="lookX" label="Look" lo="left" hi="right" min={-1} value={face.lookX}
                      onChange={(lookX) => studio.front.set({ lookX })} />
                    <MixSlider id="lookY" label="Look height" lo="down" hi="up" min={-1} value={face.lookY}
                      onChange={(lookY) => studio.front.set({ lookY })} />
                    <ChipGroup label="Left paw (raised)" value={face.padsL ? 'palm' : 'back'} items={[['palm', 'Palm'], ['back', 'Back']]}
                      onChange={(v) => studio.front.set({ padsL: v === 'palm' })} />
                    <ChipGroup label="Right paw (raised)" value={face.padsR ? 'palm' : 'back'} items={[['palm', 'Palm'], ['back', 'Back']]}
                      onChange={(v) => studio.front.set({ padsR: v === 'palm' })} />
                  </>
                )}
                {view === 'side' && studio && Object.entries(studio.side.mixes).map(([k, m]) => (
                  <MixSlider key={k} id={`mix-${k}`} label={m.label} lo={m.lo} hi={m.hi} min={m.min} value={mix[k] ?? 0}
                    onChange={(t) => { setSidePose(''); studio.side.setMix(k, t); }} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
