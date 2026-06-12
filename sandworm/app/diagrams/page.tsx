"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";
import { Card } from "@/components/ui/card";

export default function DiagramsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Diagrams</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          The Sandworm diagram vocabulary — six primitives for drawing authorization relationships,
          data flows, and permission checks. Hand-rolled SVG, one color language: teal = allowed,
          red = denied, stone = neutral.
        </p>
      </div>

      {/* A · NODES */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">A · Nodes</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A discrete entity — user, service, data store, or document. Solid 1px border
          (<code>stone-700</code>), near-black fill (<code>#0D0D10</code>), single Lucide icon at
          2px stroke. Label in mono-caps above. <strong>Border is always solid</strong> — dashed
          means something else.
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 160"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            {/* Node 1: AGENT */}
            <text
              x="80"
              y="36"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-400))"
            >
              AGENT
            </text>
            <rect
              x="40"
              y="44"
              width="80"
              height="72"
              rx="12"
              ry="12"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            {/* Person icon (Lucide-style, 2px stroke) */}
            <circle
              cx="80"
              cy="68"
              r="10"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <path
              d="M58 100 Q80 86 102 100"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Node 2: YOUR DATA */}
            <text
              x="220"
              y="36"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-400))"
            >
              YOUR DATA
            </text>
            <rect
              x="172"
              y="44"
              width="96"
              height="72"
              rx="12"
              ry="12"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            {/* Database icon (Lucide-style, 2px stroke) */}
            <ellipse
              cx="220"
              cy="66"
              rx="20"
              ry="8"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <path
              d="M200 66 L200 92"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <path
              d="M240 66 L240 92"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <ellipse
              cx="220"
              cy="92"
              rx="20"
              ry="8"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />

            {/* Node 3: APPS (rounded-full hub variant) */}
            <text
              x="370"
              y="36"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-400))"
            >
              APPS
            </text>
            <rect
              x="330"
              y="44"
              width="80"
              height="72"
              rx="36"
              ry="36"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            {/* Grid / apps icon (Lucide-style, 2px stroke) */}
            <rect
              x="355"
              y="66"
              width="10"
              height="10"
              rx="2"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <rect
              x="370"
              y="66"
              width="10"
              height="10"
              rx="2"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <rect
              x="355"
              y="81"
              width="10"
              height="10"
              rx="2"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />
            <rect
              x="370"
              y="81"
              width="10"
              height="10"
              rx="2"
              fill="none"
              stroke="hsl(var(--stone-025))"
              strokeWidth="2"
            />

            {/* Labels below */}
            <text
              x="80"
              y="132"
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--stone-400))"
            >
              rounded-lg
            </text>
            <text
              x="220"
              y="132"
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--stone-400))"
            >
              rounded-lg
            </text>
            <text
              x="370"
              y="132"
              textAnchor="middle"
              fontSize="11"
              fill="hsl(var(--stone-400))"
            >
              rounded-full (hub)
            </text>

            {/* Rule callout */}
            <text
              x="470"
              y="80"
              textAnchor="middle"
              fontSize="10"
              fill="hsl(var(--stone-500))"
            >
              solid border
            </text>
            <text
              x="470"
              y="94"
              textAnchor="middle"
              fontSize="10"
              fill="hsl(var(--stone-500))"
            >
              always
            </text>
          </svg>
        </Card>
      </section>

      {/* B · SCOPE CONTAINERS */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">B · Scope Containers</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A dashed rounded-rect groups nodes into a scope, set, or boundary. Dash array{" "}
          <code>7 3</code>, 1px, <code>stone-700</code>. Mono-caps label inset top-left.
          Containers nest — inner dash dims as depth increases.{" "}
          <strong>Solid rect = a thing; dashed rect = a grouping of things.</strong>
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 200"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            {/* Outer container: PARTITION 1 */}
            <rect
              x="20"
              y="20"
              width="480"
              height="160"
              rx="12"
              ry="12"
              fill="none"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
              strokeDasharray="7 3"
            />
            <text
              x="32"
              y="14"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-400))"
            >
              PARTITION 1
            </text>

            {/* Inner container: PREFIX 1 */}
            <rect
              x="40"
              y="44"
              width="200"
              height="116"
              rx="8"
              ry="8"
              fill="none"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
              strokeDasharray="7 3"
              opacity="0.7"
            />
            <text
              x="50"
              y="39"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-500))"
            >
              PREFIX 1
            </text>

            {/* Innermost: DOCS */}
            <rect
              x="56"
              y="64"
              width="168"
              height="76"
              rx="6"
              ry="6"
              fill="none"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
              strokeDasharray="7 3"
              opacity="0.45"
            />
            <text
              x="64"
              y="59"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-600))"
            >
              DOCS
            </text>

            {/* Tiny doc nodes inside */}
            <rect
              x="68"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <rect
              x="120"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <rect
              x="172"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />

            {/* Right side container */}
            <rect
              x="260"
              y="44"
              width="220"
              height="116"
              rx="8"
              ry="8"
              fill="none"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
              strokeDasharray="7 3"
              opacity="0.7"
            />
            <text
              x="270"
              y="39"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--stone-500))"
            >
              PREFIX 2
            </text>
            <rect
              x="276"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <rect
              x="328"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <rect
              x="380"
              y="74"
              width="44"
              height="38"
              rx="4"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />

            {/* Depth legend */}
            <text
              x="260"
              y="180"
              fontSize="10"
              fill="hsl(var(--stone-500))"
            >
              partition ▸ prefix ▸ docs — inner dash dims with depth
            </text>
          </svg>
        </Card>
      </section>

      {/* C · CONNECTORS */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">C · Connectors</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Solid 1.5px lines with simple arrowheads. Default routing is orthogonal (~16px corner
          radius). Color carries meaning:{" "}
          <code className="text-[hsl(var(--stone-400))]">stone-400</code> = neutral,{" "}
          <code className="text-[hsl(var(--teal-400))]">teal-400</code> = allowed/active,{" "}
          <code className="text-[hsl(var(--red-500))]">red-500</code> = denied.{" "}
          <strong>Never recolor an edge magenta</strong> — active is teal or opacity-dimming.
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 180"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            <defs>
              <marker
                id="arrow-stone"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--stone-400))" />
              </marker>
              <marker
                id="arrow-teal"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--teal-400))" />
              </marker>
              <marker
                id="arrow-red"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--red-500))" />
              </marker>
            </defs>

            {/* Source node */}
            <rect
              x="20"
              y="70"
              width="60"
              height="44"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <text
              x="50"
              y="97"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--stone-400))"
            >
              USER
            </text>

            {/* Neutral connector */}
            <path
              d="M80 92 L140 92"
              fill="none"
              stroke="hsl(var(--stone-400))"
              strokeWidth="1.5"
              markerEnd="url(#arrow-stone)"
            />

            {/* Middle node */}
            <rect
              x="140"
              y="70"
              width="60"
              height="44"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <text
              x="170"
              y="97"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--stone-400))"
            >
              CHECK
            </text>

            {/* Teal connector (allowed) */}
            <path
              d="M200 92 L200 50 L260 50"
              fill="none"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1.5"
              markerEnd="url(#arrow-teal)"
            />
            <text
              x="228"
              y="44"
              textAnchor="middle"
              fontSize="10"
              fill="hsl(var(--teal-400))"
              fontFamily="monospace"
            >
              ALLOWED
            </text>

            {/* Red connector (denied) */}
            <path
              d="M200 92 L200 136 L260 136"
              fill="none"
              stroke="hsl(var(--red-500))"
              strokeWidth="1.5"
              markerEnd="url(#arrow-red)"
            />
            <text
              x="228"
              y="152"
              textAnchor="middle"
              fontSize="10"
              fill="hsl(var(--red-500))"
              fontFamily="monospace"
            >
              DENIED
            </text>

            {/* Target node — allowed */}
            <rect
              x="260"
              y="28"
              width="60"
              height="44"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            <text
              x="290"
              y="55"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--teal-400))"
            >
              DOCS
            </text>

            {/* Target node — denied */}
            <rect
              x="260"
              y="114"
              width="60"
              height="44"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--red-500))"
              strokeWidth="1"
            />
            <text
              x="290"
              y="141"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--red-500))"
            >
              DOCS
            </text>

            {/* Dimmed sibling example */}
            <text
              x="390"
              y="60"
              fontSize="10"
              fill="hsl(var(--stone-600))"
              fontFamily="monospace"
            >
              orthogonal routing
            </text>
            <text
              x="390"
              y="76"
              fontSize="10"
              fill="hsl(var(--stone-600))"
              fontFamily="monospace"
            >
              ~16px corner radius
            </text>
            <text
              x="390"
              y="92"
              fontSize="10"
              fill="hsl(var(--stone-600))"
              fontFamily="monospace"
            >
              stone = neutral
            </text>
            <text
              x="390"
              y="108"
              fontSize="10"
              fill="hsl(var(--teal-400))"
              fontFamily="monospace"
            >
              teal = allowed
            </text>
            <text
              x="390"
              y="124"
              fontSize="10"
              fill="hsl(var(--red-500))"
              fontFamily="monospace"
            >
              red = denied
            </text>
          </svg>
        </Card>
      </section>

      {/* D · CHECKPOINT BEAM */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">D · Checkpoint Beam</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The signature Sandworm primitive. AuthZed drawn as the authorization layer everything
          crosses. A warm-gradient bar (sand-300 → red-400 → violet-600) with a magenta glow
          carries the Saturn logomark. Fine 1px permission threads cross it — teal for permitted,
          red for denied. <strong>One beam per diagram</strong> — it&apos;s the focal point.
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 280"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            <defs>
              {/* Warm-hero gradient: sand-300 → red-400 → violet-600 */}
              <linearGradient id="warm-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--sand-300))"
                />
                <stop
                  offset="50%"
                  stopColor="hsl(var(--red-400))"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--violet-600))"
                />
              </linearGradient>
              {/* Magenta bloom filter */}
              <filter id="beam-glow" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feFlood floodColor="hsl(var(--magenta-600))" floodOpacity="0.25" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left nodes — sources */}
            <rect
              x="20"
              y="40"
              width="64"
              height="40"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <text
              x="52"
              y="65"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--stone-400))"
            >
              AGENT
            </text>

            <rect
              x="20"
              y="120"
              width="64"
              height="40"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <text
              x="52"
              y="145"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--stone-400))"
            >
              APPS
            </text>

            <rect
              x="20"
              y="200"
              width="64"
              height="40"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--stone-700))"
              strokeWidth="1"
            />
            <text
              x="52"
              y="225"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--stone-400))"
            >
              USER
            </text>

            {/* Permission threads — left side, approaching beam */}
            <line
              x1="84"
              y1="60"
              x2="196"
              y2="60"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            <line
              x1="84"
              y1="140"
              x2="196"
              y2="140"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            <line
              x1="84"
              y1="220"
              x2="196"
              y2="220"
              stroke="hsl(var(--red-500))"
              strokeWidth="1"
            />

            {/* THE BEAM — vertical orientation */}
            <rect
              x="196"
              y="16"
              width="28"
              height="248"
              rx="4"
              fill="url(#warm-hero)"
              filter="url(#beam-glow)"
            />

            {/* Logomark coin on beam */}
            <circle
              cx="210"
              cy="140"
              r="24"
              fill="hsl(var(--stone-950))"
              stroke="hsl(var(--stone-800))"
              strokeWidth="1.5"
            />
            <image
              href="/AuthZed-Logomark-Circle-Color.svg"
              x="189"
              y="119"
              width="42"
              height="42"
            />

            {/* Permission threads — right side, exiting beam */}
            {/* teal = permitted */}
            <line
              x1="224"
              y1="60"
              x2="336"
              y2="60"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            {/* teal = permitted */}
            <line
              x1="224"
              y1="140"
              x2="336"
              y2="140"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            {/* red = denied, dims out */}
            <line
              x1="224"
              y1="220"
              x2="284"
              y2="220"
              stroke="hsl(var(--red-500))"
              strokeWidth="1"
            />
            {/* X mark for denied */}
            <line
              x1="280"
              y1="214"
              x2="292"
              y2="226"
              stroke="hsl(var(--red-500))"
              strokeWidth="1.5"
            />
            <line
              x1="292"
              y1="214"
              x2="280"
              y2="226"
              stroke="hsl(var(--red-500))"
              strokeWidth="1.5"
            />

            {/* Right nodes — resources */}
            <rect
              x="336"
              y="40"
              width="64"
              height="40"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            <text
              x="368"
              y="65"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--teal-400))"
            >
              DOCS
            </text>

            <rect
              x="336"
              y="120"
              width="64"
              height="40"
              rx="8"
              fill="#0D0D10"
              stroke="hsl(var(--teal-400))"
              strokeWidth="1"
            />
            <text
              x="368"
              y="145"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1"
              fill="hsl(var(--teal-400))"
            >
              DATA
            </text>

            {/* Beam label */}
            <text
              x="210"
              y="10"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              letterSpacing="1.5"
              fill="hsl(var(--stone-400))"
            >
              PERMISSION MANAGEMENT
            </text>

            {/* Legend */}
            <line x1="420" y1="60" x2="440" y2="60" stroke="hsl(var(--teal-400))" strokeWidth="1" />
            <text x="444" y="64" fontSize="10" fill="hsl(var(--teal-400))" fontFamily="monospace">permitted</text>
            <line x1="420" y1="80" x2="440" y2="80" stroke="hsl(var(--red-500))" strokeWidth="1" />
            <text x="444" y="84" fontSize="10" fill="hsl(var(--red-500))" fontFamily="monospace">denied</text>
            <text x="420" y="108" fontSize="10" fill="hsl(var(--stone-500))" fontFamily="monospace">sand-300 →</text>
            <text x="420" y="122" fontSize="10" fill="hsl(var(--stone-500))" fontFamily="monospace">red-400 →</text>
            <text x="420" y="136" fontSize="10" fill="hsl(var(--stone-500))" fontFamily="monospace">violet-600</text>
          </svg>
        </Card>
      </section>

      {/* E · ENTITY STATE */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">E · Entity State</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Data entities (docs, records) are file icons colored by access state. Same teal/red/stone
          vocabulary as connectors — a red doc and a red edge mean the same thing.
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 160"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            {/* Teal — accessible */}
            <g>
              {/* File icon with folded corner */}
              <path
                d="M80 36 L80 112 L128 112 L128 60 L104 36 Z"
                fill="none"
                stroke="hsl(var(--teal-400))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M104 36 L104 60 L128 60"
                fill="none"
                stroke="hsl(var(--teal-400))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Lines inside */}
              <line x1="90" y1="74" x2="118" y2="74" stroke="hsl(var(--teal-400))" strokeWidth="1.5" opacity="0.6" />
              <line x1="90" y1="84" x2="118" y2="84" stroke="hsl(var(--teal-400))" strokeWidth="1.5" opacity="0.6" />
              <line x1="90" y1="94" x2="110" y2="94" stroke="hsl(var(--teal-400))" strokeWidth="1.5" opacity="0.6" />
              <text
                x="104"
                y="130"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                letterSpacing="1.5"
                fill="hsl(var(--teal-400))"
              >
                ACCESSIBLE
              </text>
            </g>

            {/* Red — denied + padlock */}
            <g>
              {/* File icon */}
              <path
                d="M220 36 L220 112 L268 112 L268 60 L244 36 Z"
                fill="none"
                stroke="hsl(var(--red-500))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M244 36 L244 60 L268 60"
                fill="none"
                stroke="hsl(var(--red-500))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Lines inside (dimmed) */}
              <line x1="230" y1="74" x2="258" y2="74" stroke="hsl(var(--red-500))" strokeWidth="1.5" opacity="0.3" />
              <line x1="230" y1="84" x2="258" y2="84" stroke="hsl(var(--red-500))" strokeWidth="1.5" opacity="0.3" />
              <line x1="230" y1="94" x2="250" y2="94" stroke="hsl(var(--red-500))" strokeWidth="1.5" opacity="0.3" />
              {/* Padlock overlay */}
              <rect
                x="228"
                y="58"
                width="16"
                height="13"
                rx="2"
                fill="hsl(var(--stone-950))"
                stroke="hsl(var(--red-500))"
                strokeWidth="1.5"
              />
              <path
                d="M231 58 L231 54 Q236 49 241 54 L241 58"
                fill="none"
                stroke="hsl(var(--red-500))"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="236" cy="64" r="2" fill="hsl(var(--red-500))" />
              <text
                x="244"
                y="130"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                letterSpacing="1.5"
                fill="hsl(var(--red-500))"
              >
                DENIED
              </text>
            </g>

            {/* Stone — neutral/unscoped */}
            <g>
              {/* File icon */}
              <path
                d="M360 36 L360 112 L408 112 L408 60 L384 36 Z"
                fill="none"
                stroke="hsl(var(--stone-400))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M384 36 L384 60 L408 60"
                fill="none"
                stroke="hsl(var(--stone-400))"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1="370" y1="74" x2="398" y2="74" stroke="hsl(var(--stone-400))" strokeWidth="1.5" opacity="0.6" />
              <line x1="370" y1="84" x2="398" y2="84" stroke="hsl(var(--stone-400))" strokeWidth="1.5" opacity="0.6" />
              <line x1="370" y1="94" x2="390" y2="94" stroke="hsl(var(--stone-400))" strokeWidth="1.5" opacity="0.6" />
              <text
                x="384"
                y="130"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="10"
                letterSpacing="1.5"
                fill="hsl(var(--stone-400))"
              >
                NEUTRAL
              </text>
            </g>

            {/* Color key */}
            <text x="450" y="64" fontSize="10" fill="hsl(var(--teal-400))" fontFamily="monospace">teal = yes</text>
            <text x="450" y="80" fontSize="10" fill="hsl(var(--red-500))" fontFamily="monospace">red = no</text>
            <text x="450" y="96" fontSize="10" fill="hsl(var(--stone-400))" fontFamily="monospace">stone = —</text>
          </svg>
        </Card>
      </section>

      {/* F · CATEGORY EYEBROWS */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">F · Category Eyebrows</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Color-coded mono-caps eyebrows over groups of thin-border pills for capability/architecture
          taxonomies. Three families: <code>sand</code> (Permissions Model),{" "}
          <code>magenta</code> (Authorization Data), <code>teal</code> (Evaluation Engine). Decision
          nodes use violet borders.
        </p>
        <Card className="p-6">
          <svg
            viewBox="0 0 520 200"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: 520 }}
          >
            {/* Sand category: PERMISSIONS MODEL */}
            <text
              x="10"
              y="20"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--sand-300))"
            >
              PERMISSIONS MODEL
            </text>
            {/* Pills */}
            <rect x="10" y="28" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--sand-300))" strokeWidth="1" />
            <text x="51" y="44" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--sand-300))">SCHEMA</text>
            <rect x="100" y="28" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--sand-300))" strokeWidth="1" />
            <text x="141" y="44" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--sand-300))">RELATIONS</text>
            <rect x="190" y="28" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--sand-300))" strokeWidth="1" />
            <text x="231" y="44" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--sand-300))">CAVEATS</text>

            {/* Magenta category: AUTHORIZATION DATA */}
            <text
              x="10"
              y="88"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--magenta-400))"
            >
              AUTHORIZATION DATA
            </text>
            <rect x="10" y="96" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--magenta-600))" strokeWidth="1" />
            <text x="51" y="112" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--magenta-400))">SUBJECTS</text>
            <rect x="100" y="96" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--magenta-600))" strokeWidth="1" />
            <text x="141" y="112" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--magenta-400))">RESOURCES</text>
            <rect x="190" y="96" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--magenta-600))" strokeWidth="1" />
            <text x="231" y="112" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--magenta-400))">TUPLES</text>

            {/* Teal category: EVALUATION ENGINE */}
            <text
              x="10"
              y="156"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--teal-400))"
            >
              EVALUATION ENGINE
            </text>
            <rect x="10" y="164" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--teal-500))" strokeWidth="1" />
            <text x="51" y="180" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--teal-400))">EXPAND</text>
            <rect x="100" y="164" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--teal-500))" strokeWidth="1" />
            <text x="141" y="180" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--teal-400))">LOOKUP</text>
            <rect x="190" y="164" width="82" height="24" rx="12" fill="none" stroke="hsl(var(--teal-500))" strokeWidth="1" />
            <text x="231" y="180" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--teal-400))">CHECK</text>

            {/* Violet: decision node — Grant/Deny */}
            <text
              x="320"
              y="88"
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="1.5"
              fill="hsl(var(--violet-400))"
            >
              DECISION NODE
            </text>
            {/* Sparkle pill with violet border */}
            <rect x="320" y="96" width="96" height="24" rx="12" fill="none" stroke="hsl(var(--violet-600))" strokeWidth="1.5" />
            {/* Sparkle icon */}
            <text x="330" y="113" fontSize="12" fill="hsl(var(--violet-400))">✦</text>
            <text x="350" y="112" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--violet-400))">GRANT/DENY</text>

            {/* Access decision terminal */}
            <rect x="320" y="132" width="120" height="24" rx="12" fill="none" stroke="hsl(var(--violet-600))" strokeWidth="1.5" />
            <text x="380" y="148" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="1" fill="hsl(var(--violet-400))">ACCESS DECISION</text>
          </svg>
        </Card>
      </section>
    </div>
  );
}
