"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";

interface EditUserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: UserInfoData) => void;
  initialData?: UserInfoData;
}

export interface UserInfoData {
  fullName: string;
  email: string;
  avatar?: string;
}

export default function EditUserInfoModal({
  open,
  onOpenChange,
  onSave,
  initialData,
}: EditUserInfoModalProps) {
  const [formData, setFormData] = useState<UserInfoData>({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    avatar: initialData?.avatar || "",
  });
  const [previewImage, setPreviewImage] = useState<string>(
    initialData?.avatar || ""
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData({ ...formData, avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      avatar: initialData?.avatar || "",
    });
    setPreviewImage(initialData?.avatar || "");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
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
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl font-semibold text-primary">
                      {formData.fullName.charAt(0).toUpperCase() || "U"}
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
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full"
            />
          </div>

          {/* Email Input */}
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.fullName || !formData.email}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
