'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { Check, Copy, GripVertical, Code, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/ui/status-badge';
import { usePageStatus } from '@/hooks/use-page-status';
import { useToast } from '@/hooks/use-toast';

// ─── Types ───────────────────────────────────────────────────

interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  pronouns: string;
  logoUrl: string;
  website: string;
  websiteText: string;
  ctaText: string;
  ctaLink: string;
  layout: 'stacked' | 'horizontal';
  alignment: 'left' | 'center';
}

interface ElementItem {
  id: string;
  label: string;
  visible: boolean;
}

interface SavedTemplate {
  fields: SignatureData;
  order: { id: string; visible: boolean }[];
}

// ─── Constants ───────────────────────────────────────────────

// Must be an absolute public URL — relative paths break in email clients
const LOGO_URL = 'https://authzed.com/assets/brand/logomark/authzed-logomark-circle-color.png';
const TEMPLATE_KEY = 'az-sig-templates';

const DEFAULT_FIELDS: SignatureData = {
  name: 'Dibs',
  title: 'Chief Treat Officer',
  company: 'AuthZed',
  email: 'dibs@authzed.com',
  phone: '',
  pronouns: 'they/them',
  logoUrl: LOGO_URL,
  website: 'https://authzed.com',
  websiteText: 'authzed.com',
  ctaText: '',
  ctaLink: '',
  layout: 'horizontal',
  alignment: 'left',
};

const DEFAULT_ELEMENTS: ElementItem[] = [
  { id: 'logo', label: 'Logo', visible: true },
  { id: 'name', label: 'Name', visible: true },
  { id: 'title', label: 'Title', visible: true },
  { id: 'company', label: 'Company', visible: true },
  { id: 'divider', label: 'Divider', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'phone', label: 'Phone', visible: true },
  { id: 'website', label: 'Website', visible: true },
  { id: 'cta', label: 'CTA', visible: true },
];

// ─── HTML Helpers (email-safe, no Tailwind) ──────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(u: string): string {
  try {
    const p = new URL(u);
    if (['http:', 'https:', 'mailto:'].includes(p.protocol)) return u;
  } catch {
    // invalid URL
  }
  return '';
}

function renderElement(
  id: string,
  data: SignatureData,
  align: string
): string {
  const a = align === 'center' ? 'center' : 'left';
  switch (id) {
    case 'logo': {
      const logoSrc = sanitizeUrl(data.logoUrl) || LOGO_URL;
      return (
        '<tr><td align="' +
        a +
        '" style="padding:0 0 6px 0;">' +
        '<a href="https://authzed.com"><img src="' +
        esc(logoSrc) +
        '" width="80" height="80" alt="AuthZed" style="width:80px;height:80px;display:block;border:0;"></a>' +
        '</td></tr>'
      );
    }
    case 'name': {
      if (!data.name) return '';
      const pSpan = data.pronouns
        ? ' <span style="font-size:11px;font-weight:400;color:#aaa5ac;letter-spacing:0.01em;">(' +
          esc(data.pronouns) +
          ')</span>'
        : '';
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:16px;font-weight:700;color:#1e1424;padding:0 0 1px 0;font-family:Helvetica,Arial,sans-serif;line-height:1.3;">' +
        esc(data.name) +
        pSpan +
        '</td></tr>'
      );
    }
    case 'title':
      if (!data.title) return '';
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:13px;color:#655d69;padding:0;font-family:Helvetica,Arial,sans-serif;line-height:1.4;">' +
        esc(data.title) +
        '</td></tr>'
      );
    case 'company':
      if (!data.company) return '';
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:12px;font-weight:600;color:#8e8891;padding:2px 0 0 0;font-family:Helvetica,Arial,sans-serif;line-height:1.4;">' +
        esc(data.company).toUpperCase() +
        '</td></tr>'
      );
    case 'email':
      if (!data.email) return '';
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:12px;color:#655d69;padding:0;font-family:Helvetica,Arial,sans-serif;line-height:1.45;">' +
        '<a href="mailto:' +
        esc(data.email) +
        '" style="color:#655d69;text-decoration:none;">' +
        esc(data.email) +
        '</a>' +
        '</td></tr>'
      );
    case 'divider':
      return (
        '<tr><td align="' +
        a +
        '" style="padding:4px 0;">' +
        '<table cellpadding="0" cellspacing="0" border="0"' +
        (align === 'center' ? ' align="center"' : '') +
        '><tr>' +
        '<td style="width:60px;height:2px;background-color:#ffb370;font-size:1px;line-height:1px;">&nbsp;</td>' +
        '</tr></table>' +
        '</td></tr>'
      );
    case 'phone': {
      if (!data.phone) return '';
      const clean = data.phone.replace(/[^+\d]/g, '');
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:12px;color:#655d69;padding:0;font-family:Helvetica,Arial,sans-serif;line-height:1.45;">' +
        '<a href="tel:' +
        esc(clean) +
        '" style="color:#655d69;text-decoration:none;">' +
        esc(data.phone) +
        '</a>' +
        '</td></tr>'
      );
    }
    case 'website': {
      if (!data.websiteText && !data.website) return '';
      const url = sanitizeUrl(data.website) || 'https://authzed.com';
      const text = data.websiteText || 'authzed.com';
      return (
        '<tr><td align="' +
        a +
        '" style="font-size:12px;padding:0;font-family:Helvetica,Arial,sans-serif;line-height:1.45;">' +
        '<a href="' +
        esc(url) +
        '" style="color:#655d69;text-decoration:none;">' +
        esc(text) +
        '</a>' +
        '</td></tr>'
      );
    }
    case 'cta': {
      if (!data.ctaText) return '';
      const ctaUrl = sanitizeUrl(data.ctaLink) || '#';
      return (
        '<tr><td align="' +
        a +
        '" style="padding:4px 0 2px 0;">' +
        '<a href="' +
        esc(ctaUrl) +
        '" style="font-size:12px;font-weight:600;font-family:Helvetica,Arial,sans-serif;text-decoration:none;color:#ffb370;line-height:1.4;">' +
        esc(data.ctaText) +
        ' &rarr;</a></td></tr>'
      );
    }
    default:
      return '';
  }
}

function buildStackedHTML(
  data: SignatureData,
  order: { id: string; visible: boolean }[]
): string {
  const align = data.alignment;
  const tableAlign = align === 'center' ? ' align="center"' : '';
  let rows = '';
  order.forEach((item) => {
    if (item.visible) rows += renderElement(item.id, data, align);
  });
  return (
    '<table cellpadding="0" cellspacing="0" border="0"' +
    tableAlign +
    ' style="font-family:Helvetica,Arial,sans-serif;">' +
    rows +
    '</table>'
  );
}

function buildHorizontalHTML(
  data: SignatureData,
  order: { id: string; visible: boolean }[]
): string {
  let infoRows = '';
  order.forEach((item) => {
    if (item.visible && item.id !== 'logo')
      infoRows += renderElement(item.id, data, 'left');
  });

  const showLogo = order.some((item) => item.id === 'logo' && item.visible);
  const logoSrc = sanitizeUrl(data.logoUrl) || LOGO_URL;

  let logoCell: string;
  if (showLogo) {
    logoCell =
      '<td style="vertical-align:top;padding-right:14px;padding-top:2px;">' +
      '<a href="https://authzed.com"><img src="' +
      esc(logoSrc) +
      '" width="48" height="48" alt="AuthZed" style="width:48px;height:48px;display:block;border:0;"></a>' +
      '</td>' +
      '<td style="border-left:2px solid #dedddf;padding-left:14px;vertical-align:top;">';
  } else {
    logoCell = '<td style="vertical-align:top;">';
  }

  return (
    '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Helvetica,Arial,sans-serif;"><tr>' +
    logoCell +
    '<table cellpadding="0" cellspacing="0" border="0">' +
    infoRows +
    '</table>' +
    '</td>' +
    '</tr></table>'
  );
}

function buildSignatureHTML(
  data: SignatureData,
  order: { id: string; visible: boolean }[]
): string {
  return data.layout === 'horizontal'
    ? buildHorizontalHTML(data, order)
    : buildStackedHTML(data, order);
}

// ─── Template persistence ────────────────────────────────────

function getTemplates(): Record<string, SavedTemplate> {
  try {
    return JSON.parse(localStorage.getItem(TEMPLATE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveTemplates(templates: Record<string, SavedTemplate>) {
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(templates));
}

// ─── Drag and Drop Element List ──────────────────────────────

function ElementOrderList({
  elements,
  onChange,
}: {
  elements: ElementItem[];
  onChange: (elements: ElementItem[]) => void;
}) {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
    setOverIndex(index);
  };

  const handleDrop = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const updated = [...elements];
    const [removed] = updated.splice(dragItem.current, 1);
    updated.splice(dragOverItem.current, 0, removed);
    onChange(updated);
    dragItem.current = null;
    dragOverItem.current = null;
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const toggleVisibility = (index: number) => {
    const updated = [...elements];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-1">
      {elements.map((el, index) => (
        <div
          key={el.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          className={
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium cursor-grab active:cursor-grabbing select-none transition-colors' +
            (dragIndex === index
              ? ' opacity-50 bg-muted'
              : ' bg-muted/50 hover:bg-muted') +
            (overIndex === index && dragIndex !== index
              ? ' ring-2 ring-primary/20'
              : '')
          }
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0" />
          <span className="flex-1 text-muted-foreground">{el.label}</span>
          <Switch
            checked={el.visible}
            onCheckedChange={() => toggleVisibility(index)}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────

export default function EmailSignaturePage() {
  const { toast } = useToast();
  const [fields, setFields] = useState<SignatureData>(DEFAULT_FIELDS);
  const [elements, setElements] = useState<ElementItem[]>(DEFAULT_ELEMENTS);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const updateField = useCallback(
    <K extends keyof SignatureData>(key: K, value: SignatureData[K]) => {
      setFields((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const order = useMemo(
    () => elements.map((el) => ({ id: el.id, visible: el.visible })),
    [elements]
  );

  const signatureHTML = useMemo(
    () => (fields.name ? buildSignatureHTML(fields, order) : ''),
    [fields, order]
  );

  // Template names for the select dropdown
  const templateNames = useMemo(() => {
    try {
      return Object.keys(getTemplates());
    } catch {
      return [];
    }
  }, [selectedTemplate]); // re-read on template change

  const handleCopySignature = async () => {
    if (!fields.name) {
      toast({ description: 'Enter your name first' });
      return;
    }
    try {
      const blob = new Blob([signatureHTML], { type: 'text/html' });
      const textBlob = new Blob([signatureHTML], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/html': blob, 'text/plain': textBlob }),
      ]);
      toast({ description: 'Signature copied — paste into email settings' });
    } catch {
      toast({ description: 'Copy failed — try again', variant: 'destructive' });
    }
  };

  const handleCopyHTML = async () => {
    if (!fields.name) {
      toast({ description: 'Enter your name first' });
      return;
    }
    try {
      await navigator.clipboard.writeText(signatureHTML);
      toast({ description: 'HTML source copied to clipboard' });
    } catch {
      toast({ description: 'Copy failed', variant: 'destructive' });
    }
  };

  const handleSaveTemplate = () => {
    if (!fields.name) {
      toast({ description: 'Fill in your name first' });
      return;
    }
    const templates = getTemplates();
    templates[fields.name] = { fields, order };
    saveTemplates(templates);
    setSelectedTemplate(fields.name);
    toast({ description: `Template saved as "${fields.name}"` });
  };

  const handleLoadTemplate = (name: string) => {
    if (!name) return;
    setSelectedTemplate(name);
    const templates = getTemplates();
    const t = templates[name];
    if (!t) return;

    setFields(t.fields);
    if (t.order) {
      setElements((prev) => {
        const reordered: ElementItem[] = [];
        t.order.forEach((item) => {
          const existing = prev.find((el) => el.id === item.id);
          if (existing)
            reordered.push({ ...existing, visible: item.visible });
        });
        // append any elements not in saved order
        prev.forEach((el) => {
          if (!reordered.find((r) => r.id === el.id)) reordered.push(el);
        });
        return reordered;
      });
    }
    toast({ description: `Loaded "${name}"` });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Email Signature</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          Generate on-brand email signatures for Gmail and Outlook with live
          preview, drag-and-drop element ordering, and one-click copy.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <Card className="lg:order-1">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Live preview of your signature as it will appear in email clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-white/60 bg-white/80 backdrop-blur-sm p-6 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] ring-1 ring-black/[0.04] [&_*]:!border-0 [&_*]:!shadow-none [&_*]:!ring-0 [&_*]:!outline-none [&_table]:!border-collapse [&_img]:!m-0 [&_img]:!p-0">
              {fields.name ? (
                // Safe: signatureHTML is built from esc() (textContent-based XSS
                // sanitization) and sanitizeUrl() (protocol whitelist). All user
                // input is escaped before insertion into the HTML string.
                <div dangerouslySetInnerHTML={{ __html: signatureHTML }} />
              ) : (
                <div style={{ color: '#aaa5ac', fontSize: 14, fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center', padding: '32px 0' }}>
                  Fill in your details to preview
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCopySignature} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy Signature
              </Button>
              <Button
                onClick={handleCopyHTML}
                variant="outline"
                className="gap-2"
              >
                <Code className="h-4 w-4" />
                Copy HTML Source
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <strong>Gmail:</strong> Settings &rarr; Signature &rarr; Paste
              &nbsp;&middot;&nbsp;
              <strong>Outlook:</strong> Settings &rarr; Email signature &rarr;
              Paste
            </p>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:order-2">
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>
              Fill in your details and customize the layout
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Templates bar */}
            <div className="flex gap-2">
              <Button
                onClick={handleSaveTemplate}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </Button>
              <Select
                value={selectedTemplate}
                onValueChange={handleLoadTemplate}
              >
                <SelectTrigger className="flex-1 h-9">
                  <SelectValue placeholder="Load template..." />
                </SelectTrigger>
                <SelectContent>
                  {templateNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Contact fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sig-name">Full Name</Label>
                <Input
                  id="sig-name"
                  placeholder="Dibs"
                  value={fields.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-title">Title</Label>
                <Input
                  id="sig-title"
                  placeholder="Chief Treat Officer"
                  value={fields.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-company">Company</Label>
                <Input
                  id="sig-company"
                  placeholder="AuthZed"
                  value={fields.company}
                  onChange={(e) => updateField('company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-email">Email</Label>
                <Input
                  id="sig-email"
                  type="email"
                  placeholder="dibs@authzed.com"
                  value={fields.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="sig-phone">Phone</Label>
                  <Input
                    id="sig-phone"
                    type="tel"
                    placeholder="1.555.867.5309"
                    value={fields.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sig-pronouns">Pronouns</Label>
                  <Input
                    id="sig-pronouns"
                    placeholder="they/them"
                    value={fields.pronouns}
                    onChange={(e) => updateField('pronouns', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-logo">
                  Logo URL{' '}
                  <span className="text-muted-foreground font-normal">
                    (PNG for Gmail)
                  </span>
                </Label>
                <Input
                  id="sig-logo"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={fields.logoUrl}
                  onChange={(e) => updateField('logoUrl', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-website">Website URL</Label>
                <Input
                  id="sig-website"
                  type="url"
                  placeholder="https://authzed.com"
                  value={fields.website}
                  onChange={(e) => updateField('website', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-website-text">Website Text</Label>
                <Input
                  id="sig-website-text"
                  placeholder="authzed.com"
                  value={fields.websiteText}
                  onChange={(e) => updateField('websiteText', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* CTA */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Call to Action</h3>
              <div className="space-y-2">
                <Label htmlFor="sig-cta-text">CTA Text</Label>
                <Input
                  id="sig-cta-text"
                  placeholder="Learn More"
                  value={fields.ctaText}
                  onChange={(e) => updateField('ctaText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sig-cta-link">CTA Link</Label>
                <Input
                  id="sig-cta-link"
                  type="url"
                  placeholder="https://authzed.com/contact"
                  value={fields.ctaLink}
                  onChange={(e) => updateField('ctaLink', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Layout options */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Layout</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select
                    value={fields.layout}
                    onValueChange={(v) =>
                      updateField('layout', v as 'stacked' | 'horizontal')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stacked">Stacked</SelectItem>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Alignment</Label>
                  <Select
                    value={fields.alignment}
                    onValueChange={(v) =>
                      updateField('alignment', v as 'left' | 'center')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Element order */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Element Order</h3>
              <p className="text-xs text-muted-foreground">
                Drag to reorder. Toggle visibility with the switch.
              </p>
              <ElementOrderList
                elements={elements}
                onChange={setElements}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
