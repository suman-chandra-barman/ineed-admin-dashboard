"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddAdditionalFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (feature: {
    title: string;
    subtitle: string;
    price: number;
    estimateTime: number;
    estimateTimeUnit: string;
    image?: File;
  }) => void;
  isLoading?: boolean;
}

export default function AddAdditionalFeaturesModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddAdditionalFeaturesModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [timeUnit, setTimeUnit] = useState("hour");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (!title || !subtitle || !price || !estimateTime) {
      alert("Please fill all required fields");
      return;
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }

    onAdd({
      title,
      subtitle,
      price: parseFloat(price),
      estimateTime: parseFloat(estimateTime),
      estimateTimeUnit: timeUnit,
      image,
    });

    // Reset form
    setTitle("");
    setSubtitle("");
    setPrice("");
    setEstimateTime("");
    setTimeUnit("hour");
    setImage(null);
    setImagePreview(null);
  };

  const handleClose = () => {
    setTitle("");
    setSubtitle("");
    setPrice("");
    setEstimateTime("");
    setTimeUnit("hour");
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
            Add Additional Features
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Additional Features Image */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Additional Features Image
            </h3>
            <div className="flex items-center justify-between border px-4 py-1 rounded-md">
              <div className="flex items-center gap-2">
                {imagePreview ? (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    Additional Image
                  </span>
                )}
                <label className="text-sm text-yellow-500 font-medium cursor-pointer hover:underline">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
              >
                <label className="cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </Button>
            </div>
          </div>

          {/* Additional Features Title */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Additional Features Title
            </h3>
            <Input
              placeholder="Enter additional features title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-4"
            />
          </div>

          {/* Subtitle */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Subtitle
            </h3>
            <textarea
              placeholder="Enter category subtitle"
              value={subtitle}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setSubtitle(e.target.value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              Maximum 100 letter
            </div>
          </div>

          {/* Additional Features Price */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Additional Features Price
            </h3>
            <Input
              placeholder="Enter additional features price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="w-full"
            />
          </div>

          {/* Estimate Time */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Estimate Time
            </h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter estimate time"
                value={estimateTime}
                onChange={(e) => setEstimateTime(e.target.value)}
                type="number"
                className="flex-1"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hour">Hour</option>
                <option value="minute">Min</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-gray-300"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
