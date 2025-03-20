import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  BarChart2,
  Truck,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Users,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps = {}) => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: FileText, label: "Consignment", path: "/consignment" },
    { icon: ShoppingCart, label: "POS System", path: "/pos" },
    { icon: BarChart2, label: "Financial", path: "/financial" },
    { icon: Truck, label: "Suppliers", path: "/suppliers" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Users, label: "Sellers", path: "/sellers" },
  ];

  return (
    <div
      className={cn(
        "flex h-full w-[280px] flex-col bg-background border-r p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <span className="text-xl font-bold text-primary-foreground">JS</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">Jewelry Store</h1>
          <p className="text-xs text-muted-foreground">Management System</p>
        </div>
      </div>

      <Separator className="my-4" />

      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => (
          <TooltipProvider key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <Separator className="my-4" />

      <div className="mt-auto">
        <div className="flex items-center justify-between rounded-md p-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=jewelry" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Store Manager</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
