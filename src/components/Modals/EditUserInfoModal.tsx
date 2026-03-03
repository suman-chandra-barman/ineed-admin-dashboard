"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { User } from "@/app/types/auth.type";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

interface EditUserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
  user: User | null;
}

export default function EditUserInfoModal({
  open,
  onOpenChange,
  onSave,
  user,
}: EditUserInfoModalProps) {
  const [fullName, setFullName] = useState(user?.full_name ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    user?.profile_image
      ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${user.profile_image}`
      : "",
  );

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("full_name", fullName);
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      onSave?.();
      onOpenChange(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFullName(user?.full_name ?? "");
    setImageFile(null);
    setPreviewImage(
      user?.profile_image
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${user.profile_image}`
        : "",
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Edit Account Info
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground pt-1">
            Make changes to your profile here. Click save when you&apos;re done.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Avatar Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl font-semibold text-primary">
                      {fullName.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-foreground"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email - read only */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={user?.email_address ?? ""}
              readOnly
              disabled
              className="w-full bg-muted cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!fullName || isLoading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
