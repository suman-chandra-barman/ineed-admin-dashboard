"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CategoryData) => void;
  isLoading?: boolean;
}

export interface CategoryData {
  icon?: File | null;
  iconPreview?: string;
  categoryName: string;
  subtitle: string;
}

export default function AddCategoryModal({
  open,
  onOpenChange,
  onSave,
  isLoading = false,
}: AddCategoryModalProps) {
  const [formData, setFormData] = useState<CategoryData>({
    icon: null,
    iconPreview: "",
    categoryName: "",
    subtitle: "",
  });

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, icon: file, iconPreview: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    // Reset form
    setFormData({
      icon: null,
      iconPreview: "",
      categoryName: "",
      subtitle: "",
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      icon: null,
      iconPreview: "",
      categoryName: "",
      subtitle: "",
    });
    onOpenChange(false);
  };

  const maxSubtitleLength = 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Category Icon Upload */}
          <div className="space-y-2">
            <label
              htmlFor="categoryIcon"
              className="text-sm font-medium text-foreground"
            >
              Category Icon
            </label>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    id="categoryIcon"
                    type="text"
                    placeholder="category icon"
                    value={formData.icon?.name || ""}
                    readOnly
                    className="w-full pr-20"
                  />
                  <label
                    htmlFor="icon-upload"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-yellow-600 hover:text-yellow-700">
                      Upload
                    </span>
                    <input
                      id="icon-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/gif image/jpg"
                      className="hidden"
                      onChange={handleIconChange}
                    />
                  </label>
                </div>
              </div>
              <Button
                type="button"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
                onClick={() => document.getElementById("icon-upload")?.click()}
              >
                Upload
              </Button>
            </div>
          </div>

          {/* Category Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-foreground"
            >
              Category Name
            </label>
            <Input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
              className="w-full mt-2"
            />
          </div>

          {/* Subtitle Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="subtitle"
              className="text-sm font-medium text-foreground"
            >
              Subtitle
            </label>
            <div className="relative mt-2">
              <textarea
                id="subtitle"
                placeholder="Enter category subtitle"
                value={formData.subtitle}
                onChange={(e) => {
                  if (e.target.value.length <= maxSubtitleLength) {
                    setFormData({ ...formData, subtitle: e.target.value });
                  }
                }}
                className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                maxLength={maxSubtitleLength}
              />
              <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                Maximum {maxSubtitleLength} letter
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.categoryName || !formData.subtitle || isLoading}
            className="flex-1"
          >
            {isLoading ? "Creating..." : "Create"}
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
