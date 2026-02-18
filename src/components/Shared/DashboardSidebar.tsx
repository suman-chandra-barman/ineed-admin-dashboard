"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  HeartHandshake,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { toast } from "sonner";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/providers", label: "Providers", icon: UserCheck },
  { href: "/bookings", label: "Bookings", icon: Calendar },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/categories", label: "Services", icon: HeartHandshake },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/signin");
  };

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header - User Profile */}
      <SidebarHeader className="border-sidebar-border">
        <div className="py-4">
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "w-12 h-10" : "w-24 h-10"}`}
            >
              <Image
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content - Navigation Links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));

                return (
                  <SidebarMenuItem key={link.href} className="h-10">
                    <SidebarMenuButton
                      size="default"
                      asChild
                      isActive={isActive}
                      tooltip={link.label}
                      className={
                        isActive ? "bg-primary! h-full text-white!" : "h-full"
                      }
                    >
                      <Link href={link.href} className="min-w-9">
                        <Icon className="w-5! h-5!" />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer - Logout Button */}
      <SidebarFooter className="px-2 py-4">
        <Button
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600"
          size={isCollapsed ? "icon" : "default"}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Log Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
