import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, MessageSquare, Image, Sparkles } from "lucide-react";

const guidelines = [
  {
    title: "Voice & Tone",
    description: "Guidelines for maintaining consistent and effective communication.",
    href: "/guidelines/voice-tone",
    icon: MessageSquare,
  },
  {
    title: "Photography",
    description: "Standards for imagery, photography, and visual content.",
    href: "/guidelines/photography",
    icon: Image,
  },
  {
    title: "Animation",
    description: "Principles and patterns for motion and interaction.",
    href: "/guidelines/animation",
    icon: Sparkles,
  },
];

export default function GuidelinesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guidelines</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Essential guidelines and best practices for maintaining consistency across our brand and products.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guidelines.map((guideline) => (
          <Link key={guideline.href} href={guideline.href} className="group">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <guideline.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{guideline.title}</CardTitle>
                <CardDescription>{guideline.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-primary group-hover:underline inline-flex items-center">
                  View Guidelines <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">General Principles</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Consistency</h3>
                <p className="text-muted-foreground">
                  Maintain consistency across all brand touchpoints to build trust and recognition.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Ensure all content and interactions are accessible to users of all abilities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Clarity</h3>
                <p className="text-muted-foreground">
                  Communicate clearly and directly, avoiding unnecessary complexity.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  Maintain high standards in all aspects of design and communication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}