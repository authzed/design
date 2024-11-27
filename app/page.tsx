import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Palette, Type, Layout, FileCode } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <Container className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Brand Guidelines
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Comprehensive documentation for our design system, brand assets, and development components.
        </p>
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