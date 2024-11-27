import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Palette, Type, Layout, FileCode } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="space-y-8">
      <div className="flex flex-col space-y-8 max-w-[850px]">
        <h1 className="text7xlarge font-light tracking-tighter">
          Sandworm
        </h1>
        <div className="space-y-6">
          <p className="text2xlarge font-light text-muted-foreground">
            The foundation of AuthZed's design.
          </p>
          <p className="textlarge text-muted-foreground">
            Like the sandworms of Arrakis, it's always there—just beneath the surface—providing the structure 
            and resources we need to create cohesive, scalable, and user-friendly experiences.
          </p>
          <p className="textlarge text-muted-foreground">
            Whether you're designing something new or enhancing an existing feature, Sandworm ensures 
            consistency and simplicity every step of the way.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/colors" className="group">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Palette className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Colors</CardTitle>
              <CardDescription>
                Explore our color palette and usage guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                View Colors <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/typography" className="group">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Type className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Font families, sizes, and styling rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                View Typography <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/components" className="group">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Layout className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Components</CardTitle>
              <CardDescription>
                Reusable UI components and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                View Components <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guidelines" className="group">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <FileCode className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>
                Best practices and usage examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                View Guidelines <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </Container>
  );
}