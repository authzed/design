'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { usePageStatus } from '@/hooks/use-page-status';
import { slackThemes, SlackTheme } from '@/config/slack-themes';

function ThemePreview({ colors }: { colors: SlackTheme['colors'] }) {
  return (
    <div className="rounded-lg overflow-hidden border">
      {/* Top Nav Bar */}
      <div
        className="px-3 py-2 flex items-center justify-between"
        style={{ backgroundColor: colors.topNavBg }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: colors.topNavText }}
        >
          AuthZed
        </span>
      </div>
      {/* Sidebar */}
      <div
        className="p-3 space-y-1"
        style={{ backgroundColor: colors.columnBg }}
      >
        <div
          className="rounded px-2 py-1.5 text-sm flex items-center gap-2"
          style={{ backgroundColor: colors.hoverItem }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.activePresence }}
          />
          <span style={{ color: colors.textColor }}>general</span>
        </div>
        <div
          className="rounded px-2 py-1.5 text-sm flex items-center gap-2"
          style={{ backgroundColor: colors.activeItem }}
        >
          <span style={{ color: colors.activeItemText }}># random</span>
        </div>
        <div
          className="rounded px-2 py-1.5 text-sm flex items-center justify-between"
          style={{ backgroundColor: 'transparent' }}
        >
          <span style={{ color: colors.textColor }}># design</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded-full text-white font-medium"
            style={{ backgroundColor: colors.mentionBadge }}
          >
            3
          </span>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopy} variant="outline" className="gap-2">
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Theme
        </>
      )}
    </Button>
  );
}

export default function SlackThemePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Slack Theme</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground">
          Apply AuthZed brand colors to your Slack workspace for a consistent team experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {slackThemes.map((theme) => (
          <Card key={theme.name}>
            <CardHeader>
              <CardTitle>{theme.name}</CardTitle>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ThemePreview colors={theme.colors} />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Theme string:</p>
                <code className="block p-3 bg-muted rounded-md text-xs break-all font-mono">
                  {theme.themeString}
                </code>
              </div>
              <CopyButton text={theme.themeString} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Apply</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Copy the theme string above</li>
            <li>Open Slack and go to <strong className="text-foreground">Preferences</strong> (Cmd/Ctrl + ,)</li>
            <li>Click <strong className="text-foreground">Themes</strong> in the sidebar</li>
            <li>Scroll down and click <strong className="text-foreground">Create a custom theme</strong></li>
            <li>Paste the theme string into any color field - Slack will auto-populate all colors</li>
          </ol>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Slack has a separate &quot;Window gradient&quot; toggle
              in Preferences &gt; Themes that adds a subtle gradient overlay to your theme.
              This is independent of the theme colors.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Mapping</CardTitle>
          <CardDescription>How our design system colors map to the 10 Slack theme positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">#</th>
                  <th className="text-left py-2 pr-4">Slack Element</th>
                  <th className="text-left py-2 pr-4">Dark Theme</th>
                  <th className="text-left py-2">Light Theme</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">Column Background</td>
                  <td className="py-2 pr-4">stone-975</td>
                  <td className="py-2">stone-025</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">2</td>
                  <td className="py-2 pr-4">Menu BG Hover</td>
                  <td className="py-2 pr-4">stone-850</td>
                  <td className="py-2">stone-050</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">3</td>
                  <td className="py-2 pr-4">Active Item</td>
                  <td className="py-2 pr-4">stone-850</td>
                  <td className="py-2">stone-050</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">4</td>
                  <td className="py-2 pr-4">Active Item Text</td>
                  <td className="py-2 pr-4">stone-025</td>
                  <td className="py-2">stone-975</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">5</td>
                  <td className="py-2 pr-4">Hover Item</td>
                  <td className="py-2 pr-4">stone-850</td>
                  <td className="py-2">stone-050</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">6</td>
                  <td className="py-2 pr-4">Text Color</td>
                  <td className="py-2 pr-4">stone-050</td>
                  <td className="py-2">stone-600</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">7</td>
                  <td className="py-2 pr-4">Active Presence</td>
                  <td className="py-2 pr-4">teal-400</td>
                  <td className="py-2">teal-400</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">8</td>
                  <td className="py-2 pr-4">Mention Badge</td>
                  <td className="py-2 pr-4">magenta-500</td>
                  <td className="py-2">magenta-600</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">9</td>
                  <td className="py-2 pr-4">Top Nav Background</td>
                  <td className="py-2 pr-4">stone-975</td>
                  <td className="py-2">stone-025</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">10</td>
                  <td className="py-2 pr-4">Top Nav Text</td>
                  <td className="py-2 pr-4">stone-025</td>
                  <td className="py-2">stone-975</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
