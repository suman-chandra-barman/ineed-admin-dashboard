"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "../Modals/ProfileDropdown";

export function Header({ title }: { title: string }) {
  return (
    <header className="h-16 flex shrink-0 items-center gap-2 border-b bg-white px-4"> 
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex-1">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <ProfileDropdown
          userName="Suman"
          settingsLink="/settings"
        />
      </div>
    </header>
  );
}
