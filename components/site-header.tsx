import Link from "next/link";
import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { Palette, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Palette className="h-6 w-6" />
            <span className="font-bold inline-block">Brand Guidelines</span>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center space-x-2">
                  <Palette className="h-6 w-6" />
                  <span className="font-bold">Brand Guidelines</span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <SiteNav className="flex" />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold inline-block">Brand Guidelines</span>
        </Link>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}