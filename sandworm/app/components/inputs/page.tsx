"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';

export default function InputsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Inputs</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Input components for collecting user data in various formats.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Text Inputs</h2>
          <Card>
            <CardHeader>
              <CardTitle>Basic Text Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default">Default Input</Label>
                <Input id="default" placeholder="Enter text..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Disabled input" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="with-icon" className="flex items-center gap-2">
                  Input with Icon
                </Label>
                <div className="relative">
                  <Input id="with-icon" placeholder="Search..." className="pl-8" />
                  <svg
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Textarea</h2>
          <Card>
            <CardHeader>
              <CardTitle>Multiline Text Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="basic-textarea">Basic Textarea</Label>
                <Textarea
                  id="basic-textarea"
                  placeholder="Enter multiple lines of text..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resizable-textarea">Resizable Textarea</Label>
                <Textarea
                  id="resizable-textarea"
                  placeholder="This textarea can be resized..."
                  className="resize-y"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Input Variants</h2>
          <Card>
            <CardHeader>
              <CardTitle>Special Input Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="number">Number Input</Label>
                <Input id="number" type="number" placeholder="Enter a number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date Input</Label>
                <Input id="date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">File Input</Label>
                <Input id="file" type="file" />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}