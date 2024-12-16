import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertTriangle } from "lucide-react";

export default function VoiceAndTonePage() {
  const principles = [
    {
      title: "Clear & Direct",
      description: "Use simple, straightforward language that gets to the point quickly.",
      examples: {
        do: "Update your password to continue.",
        dont: "At this time, it would be advisable to proceed with updating your authentication credentials to maintain access to the system."
      }
    },
    {
      title: "Friendly & Professional",
      description: "Be approachable while maintaining professionalism.",
      examples: {
        do: "Thanks for reaching out! We'll get back to you within 24 hours.",
        dont: "Your inquiry has been received and will be processed in the order it was received."
      }
    },
    {
      title: "Empowering & Respectful",
      description: "Guide users without being condescending.",
      examples: {
        do: "Here's how to export your data in three steps.",
        dont: "Any user should be able to figure out how to export their data by following these basic steps."
      }
    },
    {
      title: "Consistent & Reliable",
      description: "Use consistent terminology across all communications.",
      examples: {
        do: "Select a payment method to complete your purchase.",
        dont: "Pick a way to pay and finish buying your stuff."
      }
    }
  ];

  const toneContexts = [
    {
      context: "Success Messages",
      tone: "Positive and affirming",
      example: "Great work! Your changes have been saved."
    },
    {
      context: "Error Messages",
      tone: "Clear and helpful",
      example: "We couldn't save your changes. Please check your connection and try again."
    },
    {
      context: "Help Documentation",
      tone: "Instructive and supportive",
      example: "Follow these steps to set up your account. Need help? We're here for you."
    },
    {
      context: "Marketing Content",
      tone: "Engaging and authentic",
      example: "Discover how our tools can transform your workflow."
    }
  ];

  return (
    <div className="container mx-auto space-y-12 px-4 md:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voice & Tone</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Guidelines for maintaining consistent and effective communication across our platform.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Core Principles</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {principles.map((principle) => (
            <Card key={principle.title}>
              <CardHeader>
                <CardTitle>{principle.title}</CardTitle>
                <p className="text-muted-foreground mt-2">{principle.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="success">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Do</AlertTitle>
                  <AlertDescription>{principle.examples.do}</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Don't</AlertTitle>
                  <AlertDescription>{principle.examples.dont}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Tone by Context</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {toneContexts.map((item) => (
            <Card key={item.context}>
              <CardHeader>
                <CardTitle>{item.context}</CardTitle>
                <p className="text-muted-foreground mt-2">Tone: {item.tone}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm italic">"{item.example}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Writing Checklist</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span>Is the message clear and concise?</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span>Does it maintain a professional yet friendly tone?</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span>Is the terminology consistent with our standards?</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span>Are we being inclusive and respectful?</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                <span>Have we provided clear next steps when needed?</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}