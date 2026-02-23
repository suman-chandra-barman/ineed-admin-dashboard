"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import DeleteAlertDialog from "@/components/Shared/DeleteAlertDialog";
import { AdditionalFeature } from "@/app/types/service.type";

interface FeatureCardProps {
  feature: AdditionalFeature;
  onDelete: (featureId: number) => Promise<void>;
  isDeleting?: boolean;
}

export default function FeatureCard({
  feature,
  onDelete,
  isDeleting = false,
}: FeatureCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await onDelete(feature.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
        <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0 overflow-hidden">
          {feature.additional_features_image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${feature.additional_features_image}`}
              alt={feature.additional_features_title}
              className="w-full h-full object-cover"
              width={48}
              height={48}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {feature.additional_features_title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{feature.subtitle}</p>
          <p className="text-xs text-gray-400 mt-1">
            {feature.estimate_time} {feature.estimate_time_unit}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-sm font-semibold text-yellow-500">
            ${feature.additional_features_price}
          </span>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-500 hover:text-red-700"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <DeleteAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Additional Feature?"
        description={`Are you sure you want to delete "${feature.additional_features_title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </>
  );
}
