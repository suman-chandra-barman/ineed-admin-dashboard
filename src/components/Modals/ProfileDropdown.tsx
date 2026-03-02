/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogoutModal } from "./LogoutModal";

interface ProfileDropdownProps {
  user: any;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setLogoutModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:bg-gray-50 rounded-full pr-3 pl-1 py-1 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {user?.profile_image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${user.profile_image}`}
                  alt={user?.full_name ?? ""}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            {user?.full_name && (
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user.full_name}
                </p>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/settings"} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutModal open={logoutModalOpen} onOpenChange={setLogoutModalOpen} />
    </>
  );
}
