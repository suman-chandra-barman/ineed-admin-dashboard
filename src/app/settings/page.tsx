"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Pencil } from "lucide-react";
import Image from "next/image";
import EditUserInfoModal, {
  UserInfoData,
} from "@/components/Modals/EditUserInfoModal";
import ChangePasswordModal, {
  PasswordData,
} from "@/components/Modals/ChangePasswordModal";

export default function SettingsPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoData>({
    fullName: "Suman",
    email: "name@gmail.com",
    avatar: "", // You can add a default avatar URL here
  });

  const handleSaveUserInfo = (data: UserInfoData) => {
    setUserInfo(data);
    console.log("User info updated:", data);
    // Here you would typically make an API call to update the user info
  };

  const handleSavePassword = (data: PasswordData) => {
    console.log("Password update requested:", data);
    // Here you would typically make an API call to update the password
  };

  return (
    <main className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Personal Information
        </h1>
        <Button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg px-6"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card - Left Side */}
        <div className="shrink-0">
          <div className="w-52 rounded-2xl border-2 border-primary/30 p-6 bg-card flex flex-col items-center">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-muted mb-4">
              {userInfo.avatar ? (
                <Image
                  src={userInfo.avatar}
                  alt={userInfo.fullName}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {userInfo.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Admin Label */}
            <span className="text-sm font-medium text-muted-foreground mb-1">
              Admin
            </span>
            
            {/* Name */}
            <span className="text-xl font-semibold text-foreground">
              {userInfo.fullName.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Information Fields - Right Side */}
        <div className="flex-1 space-y-4">
          {/* Full Name Field */}
          <div className="bg-card rounded-lg px-4 py-3 border border-border">
            <p className="text-foreground">{userInfo.fullName}</p>
          </div>

          {/* Email Field */}
          <div className="bg-card rounded-lg px-4 py-3 border border-border">
            <p className="text-muted-foreground">{userInfo.email}</p>
          </div>

          {/* Change Password Button */}
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full flex items-center justify-between bg-card hover:bg-muted/50 transition-colors rounded-lg px-4 py-3 border border-border group"
          >
            <span className="text-foreground">Change password</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <EditUserInfoModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleSaveUserInfo}
        initialData={userInfo}
      />

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onSave={handleSavePassword}
      />
    </main>
  );
}
