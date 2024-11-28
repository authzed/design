"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export default function TogglePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Toggle</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Toggle components for switching between different states and options.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Basic Toggle</h2>
          <Card>
            <CardHeader>
              <CardTitle>Single Toggle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Toggle aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </Toggle>

              <Toggle aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </Toggle>

              <Toggle aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </Toggle>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Toggle Group</h2>
          <Card>
            <CardHeader>
              <CardTitle>Text Alignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleGroup type="single">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="justify" aria-label="Justify">
                  <AlignJustify className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Multiple Selection</h2>
          <Card>
            <CardHeader>
              <CardTitle>Text Formatting</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Variants</h2>
          <Card>
            <CardHeader>
              <CardTitle>Toggle Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-x-2">
                <Toggle variant="default">
                  Default
                </Toggle>
                <Toggle variant="outline">
                  Outline
                </Toggle>
              </div>
              <div className="space-x-2">
                <Toggle size="sm">
                  Small
                </Toggle>
                <Toggle size="lg">
                  Large
                </Toggle>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}