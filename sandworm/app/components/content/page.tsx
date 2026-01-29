'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CodePreview } from "@/components/code-preview";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';
import { Button } from "@/components/ui/button";
import { Code2, Info, AlertTriangle, Lightbulb, CheckCircle, Terminal as TerminalIcon, ExternalLink } from "lucide-react";

export default function ContentPage() {
  const [showCalloutCode, setShowCalloutCode] = useState(false);
  const [showKeyTakeawaysCode, setShowKeyTakeawaysCode] = useState(false);
  const [showTimelineCode, setShowTimelineCode] = useState(false);
  const [showFigureCode, setShowFigureCode] = useState(false);
  const [showVideoCode, setShowVideoCode] = useState(false);
  const [showLinkCardCode, setShowLinkCardCode] = useState(false);
  const [showTerminalCode, setShowTerminalCode] = useState(false);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Content Components</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          MDX blog components for rich content presentation. These components follow an editorial design approach with typography-focused styling and subtle left-border accents.
        </p>
      </div>

      <div className="space-y-8">
        {/* Callout Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Callout</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalloutCode(!showCalloutCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showCalloutCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Info Callout */}
              <div className="border-l-4 border-teal-600 bg-stone-025 py-4 pl-5 pr-4">
                <div className="mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-bold uppercase tracking-wide text-teal-700">Note</span>
                </div>
                <div className="text-stone-700">
                  SpiceDB requires at least one relationship to be written before permissions can be checked.
                </div>
              </div>

              {/* Warning Callout */}
              <div className="border-l-4 border-sand-400 bg-stone-025 py-4 pl-5 pr-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-sand-500" />
                  <span className="text-sm font-bold uppercase tracking-wide text-sand-600">Warning</span>
                </div>
                <div className="text-stone-700">
                  Breaking changes in v1.30.0 - please review the migration guide.
                </div>
              </div>

              {/* Tip Callout */}
              <div className="border-l-4 border-violet-500 bg-stone-025 py-4 pl-5 pr-4">
                <div className="mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-violet-500" />
                  <span className="text-sm font-bold uppercase tracking-wide text-violet-600">Tip</span>
                </div>
                <div className="text-stone-700">
                  Use the playground to test your schema before deploying to production.
                </div>
              </div>

              {/* Success Callout */}
              <div className="border-l-4 border-teal-500 bg-stone-025 py-4 pl-5 pr-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-500" />
                  <span className="text-sm font-bold uppercase tracking-wide text-teal-600">Success</span>
                </div>
                <div className="text-stone-700">
                  Your schema has been validated and is ready for deployment.
                </div>
              </div>

              {showCalloutCode && (
                <CodePreview
                  usage={`<Callout type="info" title="Note">
  SpiceDB requires at least one relationship
  to be written before permissions can be checked.
</Callout>

<Callout type="warning" title="Warning">
  Breaking changes in v1.30.0 - please review
  the migration guide.
</Callout>

<Callout type="tip" title="Tip">
  Use the playground to test your schema
  before deploying to production.
</Callout>

<Callout type="success" title="Success">
  Your schema has been validated and is
  ready for deployment.
</Callout>`}
                  imports={`// Auto-imported in MDX files
// Available types: info, warning, tip, success`}
                  component={`src/components/mdx/custom/Callout.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Key Takeaways Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Key Takeaways</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKeyTakeawaysCode(!showKeyTakeawaysCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showKeyTakeawaysCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Key Takeaways Example */}
              <div className="border-l-4 border-magenta-600 bg-stone-025 py-5 pl-6 pr-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-magenta-700">
                  Key Takeaways
                </h3>
                <ul className="list-inside list-disc space-y-2 text-stone-700">
                  <li>SpiceDB implements Google&apos;s Zanzibar paper</li>
                  <li>Use relationships for fine-grained access control</li>
                  <li>Schema validation catches errors early</li>
                  <li>The Watch API enables real-time updates</li>
                </ul>
              </div>

              {/* TL;DR Variant */}
              <div className="rounded-lg border border-stone-300 bg-stone-050 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded bg-stone-800 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-stone-100">
                    TL;DR
                  </span>
                </div>
                <div className="text-stone-700">
                  SpiceDB is a database system for managing application permissions that implements Google&apos;s Zanzibar paper.
                </div>
              </div>

              {showKeyTakeawaysCode && (
                <CodePreview
                  usage={`<KeyTakeaways>
  - SpiceDB implements Google's Zanzibar paper
  - Use relationships for fine-grained access control
  - Schema validation catches errors early
  - The Watch API enables real-time updates
</KeyTakeaways>

<KeyTakeaways title="What you'll learn" position="top">
  - How to install SpiceDB
  - Writing your first schema
  - Testing permissions locally
</KeyTakeaways>

<TLDR>
  SpiceDB is a database system for managing
  application permissions that implements
  Google's Zanzibar paper.
</TLDR>`}
                  imports={`// Auto-imported in MDX files`}
                  component={`src/components/mdx/custom/KeyTakeaways.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Timeline</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTimelineCode(!showTimelineCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showTimelineCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Timeline Example */}
              <div className="space-y-0">
                {/* Complete Item */}
                <div className="relative pb-6 pl-6">
                  <div className="absolute bottom-0 left-[5px] top-4 w-px bg-stone-200" />
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-stone-400" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="font-medium text-stone-800">Install SpiceDB</h4>
                    </div>
                    <div className="mt-1 text-sm text-stone-600">Download and install the SpiceDB binary</div>
                  </div>
                </div>

                {/* Current Item */}
                <div className="relative pb-6 pl-6">
                  <div className="absolute bottom-0 left-[5px] top-4 w-px bg-stone-200" />
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-magenta-600" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="font-medium text-magenta-700">Define Schema</h4>
                    </div>
                    <div className="mt-1 text-sm text-stone-600">Create your permission schema</div>
                  </div>
                </div>

                {/* Upcoming Item */}
                <div className="relative pb-0 pl-6">
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-stone-300 bg-stone-200" />
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="font-medium text-stone-500">Write Relationships</h4>
                    </div>
                    <div className="mt-1 text-sm text-stone-600">Add your data relationships</div>
                  </div>
                </div>
              </div>

              {showTimelineCode && (
                <CodePreview
                  usage={`<Timeline>
  <TimelineItem title="Install SpiceDB" status="complete">
    Download and install the SpiceDB binary
  </TimelineItem>
  <TimelineItem title="Define Schema" status="current">
    Create your permission schema
  </TimelineItem>
  <TimelineItem title="Write Relationships" status="upcoming">
    Add your data relationships
  </TimelineItem>
</Timeline>

// For release timelines:
<Timeline>
  <TimelineItem title="v1.30.0" date="January 2024">
    Added caching improvements
  </TimelineItem>
  <TimelineItem title="v1.29.0" date="December 2023">
    New bulk import API
  </TimelineItem>
</Timeline>`}
                  imports={`// Auto-imported in MDX files
// status: 'complete' | 'current' | 'upcoming'`}
                  component={`src/components/mdx/custom/Timeline.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Figure Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Figure</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFigureCode(!showFigureCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showFigureCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Figure Example */}
              <figure className="max-w-2xl mx-auto">
                <div className="overflow-hidden bg-stone-025 p-4 border border-stone-200">
                  <div className="aspect-video bg-stone-100 flex items-center justify-center text-stone-400">
                    [Image placeholder]
                  </div>
                </div>
                <figcaption className="mt-3 border-l-2 border-stone-300 pl-3 text-sm text-stone-600">
                  Figure 1: High-level SpiceDB architecture showing the relationship between clients, SpiceDB, and the datastore
                </figcaption>
              </figure>

              {showFigureCode && (
                <CodePreview
                  usage={`<Figure
  src="/images/blogs/example.png"
  alt="Architecture diagram"
  caption="Figure 1: The SpiceDB architecture"
  size="large"
  bordered
/>

// Size options: small, medium, large, full
// Optional: bordered, shadow`}
                  imports={`// Auto-imported in MDX files`}
                  component={`src/components/mdx/custom/Figure.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Video Embed Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Video Embed</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVideoCode(!showVideoCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showVideoCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Video Example */}
              <figure>
                <div className="aspect-video w-full overflow-hidden border border-stone-200 bg-stone-900 flex items-center justify-center">
                  <div className="text-stone-400">[YouTube embed placeholder]</div>
                </div>
                <figcaption className="mt-3 border-l-2 border-stone-300 pl-3 text-sm text-stone-600">
                  Watch: Getting started with SpiceDB in 10 minutes
                </figcaption>
              </figure>

              {/* Spotify Example */}
              <figure>
                <div className="h-[152px] w-full overflow-hidden border border-stone-200 bg-stone-900 flex items-center justify-center">
                  <div className="text-stone-400">[Spotify embed placeholder]</div>
                </div>
                <figcaption className="mt-3 border-l-2 border-stone-300 pl-3 text-sm text-stone-600">
                  Listen: The Open Source Startup Podcast
                </figcaption>
              </figure>

              {showVideoCode && (
                <CodePreview
                  usage={`// YouTube
<VideoEmbed
  youtube="dQw4w9WgXcQ"
  title="SpiceDB Overview"
  caption="Watch: Getting started with SpiceDB"
/>

// Vimeo
<VideoEmbed
  vimeo="123456789"
  caption="Conference talk"
/>

// Spotify (episode, track, or playlist)
<VideoEmbed
  spotify="3igAMNYiwA2aJRc8MoiALx"
  spotifyType="episode"
  title="Podcast Episode"
  caption="Listen: The podcast"
/>`}
                  imports={`// Auto-imported in MDX files
// Supports: youtube, vimeo, spotify
// aspectRatio: '16/9' | '4/3' | '1/1'`}
                  component={`src/components/mdx/custom/VideoEmbed.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Link Card Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Link Card</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLinkCardCode(!showLinkCardCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showLinkCardCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Link Card Examples */}
              <div className="space-y-3">
                {/* GitHub Link */}
                <a className="group block border-l-2 border-stone-300 py-2 pl-4 transition-colors hover:border-magenta-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 transition-colors group-hover:text-magenta-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <h4 className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 transition-colors group-hover:text-magenta-700 group-hover:decoration-magenta-600">
                      SpiceDB
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">Open source permissions database inspired by Zanzibar</p>
                </a>

                {/* Docs Link */}
                <a className="group block border-l-2 border-stone-300 py-2 pl-4 transition-colors hover:border-magenta-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 transition-colors group-hover:text-magenta-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </span>
                    <h4 className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 transition-colors group-hover:text-magenta-700 group-hover:decoration-magenta-600">
                      Documentation
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">Learn how to use SpiceDB</p>
                </a>

                {/* External Link */}
                <a className="group block border-l-2 border-stone-300 py-2 pl-4 transition-colors hover:border-magenta-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 transition-colors group-hover:text-magenta-600">
                      <ExternalLink className="h-5 w-5" />
                    </span>
                    <h4 className="font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 transition-colors group-hover:text-magenta-700 group-hover:decoration-magenta-600">
                      Zanzibar Paper
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">Google&apos;s original research paper on global authorization</p>
                </a>
              </div>

              {showLinkCardCode && (
                <CodePreview
                  usage={`<LinkCard
  href="https://github.com/authzed/spicedb"
  title="SpiceDB"
  description="Open source permissions database"
  type="github"
/>

<LinkCard
  href="https://authzed.com/docs"
  title="Documentation"
  description="Learn how to use SpiceDB"
  type="docs"
/>

// Grid layout for multiple cards
<LinkCardGrid>
  <LinkCard href="..." title="..." type="github" />
  <LinkCard href="..." title="..." type="docs" />
</LinkCardGrid>`}
                  imports={`// Auto-imported in MDX files
// type: 'default' | 'github' | 'docs' | 'external'`}
                  component={`src/components/mdx/custom/LinkCard.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>

        {/* Terminal Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Terminal</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTerminalCode(!showTerminalCode)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              {showTerminalCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* Terminal Example */}
              <div className="overflow-hidden rounded-lg border border-stone-700 bg-stone-900">
                <div className="flex items-center gap-2 border-b border-stone-700 bg-stone-800 px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-sand-400" />
                    <div className="h-3 w-3 rounded-full bg-teal-500" />
                  </div>
                  <span className="ml-2 text-xs text-stone-400">Terminal</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <span className="select-none text-teal-400">$</span>
                    <span className="text-stone-100">brew install authzed/tap/spicedb</span>
                  </div>
                  <div className="mt-2 text-stone-400">
                    =&gt; Installing spicedb from authzed/tap<br />
                    =&gt; Downloading...<br />
                    🍺 spicedb was successfully installed!
                  </div>
                </div>
              </div>

              {showTerminalCode && (
                <CodePreview
                  usage={`<Terminal title="Terminal">
  <TerminalLine prompt>
    brew install authzed/tap/spicedb
  </TerminalLine>
  <TerminalOutput>
    => Installing spicedb from authzed/tap
    => Downloading...
    🍺 spicedb was successfully installed!
  </TerminalOutput>
</Terminal>

// Copyable command
<Terminal title="bash" copyable>
  <TerminalLine prompt>
    spicedb serve --grpc-preshared-key "secret"
  </TerminalLine>
</Terminal>`}
                  imports={`// Auto-imported in MDX files`}
                  component={`src/components/mdx/custom/Terminal.tsx`}
                />
              )}
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Design Principles Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Design Principles</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Editorial Approach</h3>
              <p className="text-muted-foreground">
                Content components use typography-focused styling with subtle left-border accents rather than heavy backgrounds or decorations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Consistent Patterns</h3>
              <p className="text-muted-foreground">
                All components use <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm">border-l-2 border-stone-300</code> for accent borders, with magenta highlights for emphasis states.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sandworm Colors</h3>
              <p className="text-muted-foreground">
                Components use the proper Sandworm color scale (025, 050, 100) for backgrounds instead of generic Tailwind values.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
