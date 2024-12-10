import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Activity, AlertCircle, Archive, ArrowRight, Bell, Bookmark, Calendar, Check, ChevronDown, ChevronRight, Circle, Copy, Edit, ExternalLink, File, FileText, Filter, Flag, Folder, Heart, Home, Image, Info, Link, Mail, MapPin, Menu, MessageCircle, MoreHorizontal, MoreVertical, Package, PenTool, Plus, Search, Send, Settings, Share, Star, Tag, Trash, User, X } from "lucide-react";

const icons = [
  { name: "Activity", component: Activity },
  { name: "AlertCircle", component: AlertCircle },
  { name: "Archive", component: Archive },
  { name: "ArrowRight", component: ArrowRight },
  { name: "Bell", component: Bell },
  { name: "Bookmark", component: Bookmark },
  { name: "Calendar", component: Calendar },
  { name: "Check", component: Check },
  { name: "ChevronDown", component: ChevronDown },
  { name: "ChevronRight", component: ChevronRight },
  { name: "Circle", component: Circle },
  { name: "Copy", component: Copy },
  { name: "Edit", component: Edit },
  { name: "ExternalLink", component: ExternalLink },
  { name: "File", component: File },
  { name: "FileText", component: FileText },
  { name: "Filter", component: Filter },
  { name: "Flag", component: Flag },
  { name: "Folder", component: Folder },
  { name: "Heart", component: Heart },
  { name: "Home", component: Home },
  { name: "Image", component: Image },
  { name: "Info", component: Info },
  { name: "Link", component: Link },
  { name: "Mail", component: Mail },
  { name: "MapPin", component: MapPin },
  { name: "Menu", component: Menu },
  { name: "MessageCircle", component: MessageCircle },
  { name: "MoreHorizontal", component: MoreHorizontal },
  { name: "MoreVertical", component: MoreVertical },
  { name: "Package", component: Package },
  { name: "PenTool", component: PenTool },
  { name: "Plus", component: Plus },
  { name: "Search", component: Search },
  { name: "Send", component: Send },
  { name: "Settings", component: Settings },
  { name: "Share", component: Share },
  { name: "Star", component: Star },
  { name: "Tag", component: Tag },
  { name: "Trash", component: Trash },
  { name: "User", component: User },
  { name: "X", component: X },
];

export default function IconsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Icons</h1>
          <StatusBadge status="coming-soon" />
        </div>
        <p className="text-lg text-muted-foreground">
          Our icon library and guidelines for usage.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Icon Library</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {icons.map((icon) => (
              <Card key={icon.name} className="p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <icon.component className="h-8 w-8" />
                  <span className="text-sm font-medium">{icon.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Usage Guidelines</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs mt-2">16px</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-5 w-5" />
                  <span className="text-xs mt-2">20px</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-6 w-6" />
                  <span className="text-xs mt-2">24px</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-8 w-8" />
                  <span className="text-xs mt-2">32px</span>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Colors</h3>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="text-xs mt-2">Primary</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs mt-2">Muted</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-6 w-6 text-success" />
                  <span className="text-xs mt-2">Success</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-6 w-6 text-destructive" />
                  <span className="text-xs mt-2">Destructive</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}