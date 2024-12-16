"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/status-badge";
import { useState } from "react";
import { usePageStatus } from '@/hooks/use-page-status';

export default function DataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Data Entry</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Components for entering and editing different types of data.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Calendar</h2>
          <Card>
            <CardHeader>
              <CardTitle>Date Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Slider</h2>
          <Card>
            <CardHeader>
              <CardTitle>Range Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={sliderValue}
                onValueChange={setSliderValue}
              />
              <div className="text-sm text-muted-foreground">
                Selected value: {sliderValue}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Switch</h2>
          <Card>
            <CardHeader>
              <CardTitle>Toggle Switch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label>Enable feature</Label>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Form Example</h2>
          <Card>
            <CardHeader>
              <CardTitle>Data Entry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">
                      Receive email notifications
                    </Label>
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}