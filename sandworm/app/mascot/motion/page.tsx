'use client';

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';
import { Check, Copy, Download, Pause, Play } from "lucide-react";

const BASE = "/dibs/motion";

type Category = "Hops" | "Gestures" | "Reactions" | "Looking" | "Entrances and exits";

interface Recipe {
  id: string;
  title: string;
  category: Category;
  secs: number;
  // keyframe = the seated still, empty = the grey plate with no Dibs
  start: "keyframe" | "empty";
  end: "keyframe" | "empty";
  prompt: string;
  note?: string;
}

const LOOP = "Ends in exactly the same seated pose. Static camera, plain grey background.";
const FOLLOW = "On the way up the ears trail behind, on landing they flop forward and settle; the tail swings for balance.";

const recipes: Recipe[] = [
  { id: "01-small-hop", title: "Small hop", category: "Hops", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa does two quick small hops in place. ${FOLLOW} ${LOOP}` },
  { id: "02-big-hop", title: "Big hop", category: "Hops", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa does one quick, springy hop straight up in place with short hang time, at natural speed. ${FOLLOW} ${LOOP}` },
  { id: "14-excited", title: "Excited", category: "Hops", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa bounces up and down three times with small springy hops, not frantic. The ears flap with each bounce and the tail swings. Eyes stay open, same face. ${LOOP}` },
  { id: "05-wave", title: "Wave", category: "Gestures", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa raises one front paw and waves twice. The ears bob gently with each wave and the tail sways. Eyes stay open, same face. ${LOOP}` },
  { id: "06-cheer", title: "Cheer", category: "Gestures", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa bounces up with both front paws raised, then the paws come back down and it settles. The ears flop with the bounce and the tail swings. Eyes stay open, same face. ${LOOP}` },
  { id: "08-point", title: "Point", category: "Gestures", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa points with one front paw toward the right side of the frame, the ears perk toward it, then it lowers the paw. Eyes stay open, same face. ${LOOP}`,
    note: "Points right, for UI callouts. A left point is untested." },
  { id: "12-clap", title: "Clap", category: "Gestures", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa claps its two front paws together twice, happily. The ears bob with each clap and the tail swings. Eyes stay open, same face. ${LOOP}` },
  { id: "13-think", title: "Think", category: "Gestures", secs: 4, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa taps its chin with one front paw and the ears tilt to one side, then it lowers the paw. The tail sways gently. Eyes stay open, same face. ${LOOP}` },
  { id: "07-flinch", title: "Flinch", category: "Reactions", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa flinches: the body jolts back and the ears shoot straight up, then it relaxes, the ears flop and settle and the tail flicks. Same face throughout. ${LOOP}`,
    note: "5 s also works." },
  { id: "09-sad", title: "Sad", category: "Reactions", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa's ears droop down slowly and its body slumps a little, the tail drops, then the ears lift back up and it sits up again. ${LOOP}` },
  { id: "10-sleepy", title: "Sleepy", category: "Reactions", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa slowly nods off: the head droops and the ears flop down, then it jerks back awake and sits up. ${LOOP}` },
  { id: "03-curious-sniff", title: "Curious sniff", category: "Looking", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa leans forward to sniff, the ears swivel forward and the tail sways, then it leans back. Eyes stay open, same face. ${LOOP}` },
  { id: "11-look-up", title: "Look up", category: "Looking", secs: 4, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa leans back to look up, the ears swivel back and the tail sways, then it leans forward again. Eyes stay open, same face. ${LOOP}` },
  { id: "16-look-left-right", title: "Look left and right", category: "Looking", secs: 3.5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa slowly turns its head a little to the left, then a little to the right, then back to center. The head stays level and the body stays still. Eyes stay open, same face. ${LOOP}` },
  { id: "15-head-shake", title: "Head shake (no)", category: "Looking", secs: 3, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa gives a small head shake, turning the head slightly left and right twice. The head stays level and the body stays completely still. Eyes stay open, same face. ${LOOP}` },
  { id: "04-tail-swish", title: "Tail swish", category: "Looking", secs: 5, start: "keyframe", end: "keyframe",
    prompt: `The cartoon jerboa sits still while its tail swishes side to side twice and the ears flop gently. Eyes stay open, same face. ${LOOP}` },
  { id: "17-hop-in-right", title: "Hop in from the right", category: "Entrances and exits", secs: 4, start: "empty", end: "keyframe",
    prompt: `The cartoon jerboa hops into the frame from the right edge with quick, springy hops, short hang time, at natural speed, and lands in its seated pose. ${FOLLOW} Eyes stay open, same face. Static camera, plain grey background.` },
  { id: "18-drop-in", title: "Drop in from above", category: "Entrances and exits", secs: 3.5, start: "empty", end: "keyframe",
    prompt: `The cartoon jerboa drops into view from above the top edge of the frame and lands in its seated pose with a small bounce, at natural speed. ${FOLLOW} Eyes stay open, same face. Static camera, plain grey background.` },
  { id: "19-jump-in", title: "Jump in from below", category: "Entrances and exits", secs: 3.5, start: "empty", end: "keyframe",
    prompt: `The cartoon jerboa jumps up into view from below the bottom edge of the frame, arcs up, and lands in its seated pose, at natural speed. ${FOLLOW} Eyes stay open, same face. Static camera, plain grey background.` },
  { id: "20-leap-out-right", title: "Leap out to the right", category: "Entrances and exits", secs: 3.5, start: "keyframe", end: "empty",
    prompt: `The cartoon jerboa turns to face right and does one quick, springy leap out of the frame to the right, short hang time, at natural speed. ${FOLLOW} Eyes stay open, same face. Static camera, plain grey background.` },
];

const categories: ("All" | Category)[] = ["All", "Hops", "Gestures", "Reactions", "Looking", "Entrances and exits"];

const promptShape = [
  ["Subject", "“The cartoon jerboa”"],
  ["Body move", "One clear action with a count: “waves twice”, “one quick, springy hop”."],
  ["Follow-through", "What the ears and tail do. This is what makes it read as Dibs."],
  ["Face lock", "“Eyes stay open, same face.” Without it the model swaps in grins and winks."],
  ["Loop close", "“Ends in exactly the same seated pose.”"],
  ["Stage", "“Static camera, plain grey background.”"],
];

const rules = [
  ["Short and plain beats descriptive.", "Long, flowery prompts make the motion worse."],
  ["Gestures run 3 to 4 seconds.", "At 5 s a wave drags and a cheer ends in a dead held pose."],
  ["Don't name what you don't want.", "“No teeth” still produced teeth. Describe the body, leave the face alone."],
  ["Pick verbs that are pure body.", "“Startles” brought in an open mouth. “Flinches: the body jolts back” kept the face."],
  ["Lean, don't turn.", "Head turns warp the ears. “Leans forward to sniff” works."],
  ["Natural speed.", "Long hang time reads as slow motion. Say “short hang time, at natural speed”."],
  ["Head gestures: small, level, body still.", "Every other motion still needs a body move to read at all."],
  ["Stay on grey.", "Cutouts (matting, green screen) were tested and dropped. Placement is a design job."],
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy prompt"}
    </Button>
  );
}

// Plays twice on load, then stops. Click the clip to pause, resume, or play it twice again.
const PLAYS = 2;

function ClipPlayer({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const plays = useRef(1);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.paused) return v.pause();
    if (v.ended || v.currentTime === 0) plays.current = 1;
    v.play();
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"} ${title}`}
      className="group relative block w-full aspect-[5/6] bg-muted"
    >
      <video
        ref={ref}
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={(e) => {
          if (plays.current < PLAYS) {
            plays.current += 1;
            e.currentTarget.currentTime = 0;
            e.currentTarget.play();
          }
        }}
      />
      <span
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm transition-opacity ${
          playing ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"
        }`}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </span>
    </button>
  );
}

function RecipeCard({ r }: { r: Recipe }) {
  const frames = r.start === r.end ? "keyframe → keyframe (loops)" : `${r.start === "empty" ? "empty plate" : "keyframe"} → ${r.end === "empty" ? "empty plate" : "keyframe"}`;
  return (
    <Card className="overflow-hidden flex flex-col">
      <ClipPlayer src={`${BASE}/${r.id}.mp4`} title={r.title} />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold">{r.title}</h3>
            <span className="text-xs text-muted-foreground tabular-nums">{r.secs} s · seed 1</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{frames}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.prompt}</p>
        {r.note && <p className="text-xs text-muted-foreground italic">{r.note}</p>}
        <div>
          <CopyButton text={r.prompt} />
        </div>
      </div>
    </Card>
  );
}

export default function DibsMotionPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = filter === "All" ? recipes : recipes.filter((r) => r.category === filter);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Dibs motion</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl">
          Prompts that make Dibs move on-model in AI video, each shown with the clip it produced.
          Watch the clip to see what you&apos;ll get, copy the prompt to make your own. Every recipe
          was approved from the rendered clip, not the text.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>
              {c}
              <span className="ml-1 text-xs opacity-60 tabular-nums">
                {c === "All" ? recipes.length : recipes.filter((r) => r.category === c).length}
              </span>
            </Button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((r) => (
            <RecipeCard key={r.id} r={r} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Make your own</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { file: "keyframe-seated-3q.png", title: "Keyframe", body: "The approved seated 3/4 still. Use it as both the first and last frame so Dibs stays on-model and the clip loops." },
            { file: "empty-plate.png", title: "Empty plate", body: "The same grey with no Dibs. Start on it for an entrance, end on it for an exit." },
          ].map((f) => (
            <Card key={f.file} className="p-4 flex gap-4 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/${f.file}`} alt={f.title} className="w-28 rounded-md bg-muted" />
              <div className="space-y-2">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.body}</p>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <a href={`${BASE}/${f.file}`} download>
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold">Settings</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>
              <span className="text-foreground">Model:</span> H3 Max Turbo on fal,{" "}
              <code className="text-xs">minimax/h3-max-turbo/image-to-video</code>. About 2 cents a second at 480P,
              seconds per clip, so iterate here. Move to Seedance 2.5 only once a motion is approved.
            </li>
            <li><span className="text-foreground">Resolution:</span> 480P while iterating.</li>
            <li><span className="text-foreground">Prompt rewriting:</span> off (<code className="text-xs">prompt_expansion_mode: disabled</code>).</li>
            <li><span className="text-foreground">Seed:</span> keep the one on the card. The same words move differently on another seed.</li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">The shape every prompt shares</h3>
          <ol className="space-y-2 text-sm">
            {promptShape.map(([k, v], i) => (
              <li key={k} className="flex gap-3">
                <span className="text-muted-foreground tabular-nums w-4">{i + 1}</span>
                <span><span className="font-medium">{k}.</span> <span className="text-muted-foreground">{v}</span></span>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Rules learned the hard way</h3>
          <ul className="space-y-2 text-sm">
            {rules.map(([k, v]) => (
              <li key={k}><span className="font-medium">{k}</span> <span className="text-muted-foreground">{v}</span></li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Not covered yet</h2>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5 max-w-3xl">
          <li><span className="text-foreground">Nod:</span> every wording moved the whole body. Likely a job for the rig.</li>
          <li><span className="text-foreground">Exit left and duck out:</span> no take held up yet.</li>
          <li><span className="text-foreground">Other angles:</span> every recipe was tested on one seated 3/4 keyframe. A new keyframe means re-checking them.</li>
        </ul>
      </div>
    </div>
  );
}
