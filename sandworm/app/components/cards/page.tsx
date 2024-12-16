import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, MessageCircle, Share } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cards</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Card components for displaying content in a contained format with various layouts and styles.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Basic Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card with header and content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a simple card component that can be used to display content in a clean, contained format.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes a footer with actions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can include footers for additional actions or information.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Interactive Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>This card has hover effects.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover over this card to see the shadow effect.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="ml-auto">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>Card with interactive components.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Cards can contain various interactive elements.</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Heart className="mr-2 h-4 w-4" /> Like
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" /> Comment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Content Cards</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">User Profile Card</CardTitle>
                  <CardDescription>With avatar and badges</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Badge>Developer</Badge>
                  <Badge variant="secondary">Pro Member</Badge>
                </div>
                <p>A card displaying user profile information with avatar and status badges.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Highlighting key features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Feature One</h3>
                    <p className="text-sm text-muted-foreground">Description of the first feature</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Feature Two</h3>
                    <p className="text-sm text-muted-foreground">Description of the second feature</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Card Variations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Colored Card</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  With custom background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can have custom background colors and text colors.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
                <CardDescription>With custom border</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can have custom border styles.</p>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
                <CardDescription>With muted background</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can have muted backgrounds for less emphasis.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}