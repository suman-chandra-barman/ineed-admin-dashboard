/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useDeleteServiceMutation } from "@/redux/features/services/serviceApi";
import { toast } from "sonner";
import AddAdditionalFeaturesModal from "../Modals/AddAdditionalFeaturesModal";
import DeleteAlertDialog from "../Shared/DeleteAlertDialog";
import { useCreateAdditionalFeatureMutation } from "@/redux/features/services/serviceApi";

interface ServiceCardProps {
  service: any;
  priority?: boolean;
}

const ServiceCard = memo(({ service, priority = false }: ServiceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [createAdditionalFeature, { isLoading: isCreatingFeature }] =
  useCreateAdditionalFeatureMutation();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteService(service.id).unwrap();
      
      toast.success("Service deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (err) {
      let errorMessage = "Failed to delete service";
      if (err && typeof err === "object" && "data" in err) {
        const error = err as { data?: { message?: string } };
        if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const handleEdit = () => {
    router.push(
      `/categories/services/${service.category_id || service.category?.id}/edit/${service.id}`,
    );
  };

  const handleAddFeature = async (feature: {
    title: string;
    subtitle: string;
    price: number;
    estimateTime: number;
    estimateTimeUnit: string;
    image?: File;
  }) => {
    if (!feature.image) {
      toast.error("Please upload an image for the additional feature");
      return;
    }

    try {
      await createAdditionalFeature({
        service_id: service.id,
        additional_features_title: feature.title,
        subtitle: feature.subtitle,
        additional_features_price: feature.price.toString(),
        additional_features_image: feature.image,
        estimate_time: feature.estimateTime.toString(),
        estimate_time_unit: feature.estimateTimeUnit,
      }).unwrap();

      toast.success("Additional feature added successfully");
      setIsModalOpen(false);
    } catch (err) {
      let errorMessage = "Failed to add additional feature";
      if (err && typeof err === "object" && "data" in err) {
        const error = err as { data?: { message?: string } };
        if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
        {/* Image */}
        <div
          className="relative h-60 sm:h-56 bg-gray-200 overflow-hidden block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`View ${service.title} service details`}
        >
          <Image
            src={service.image}
            alt={`${service.title} service thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {service.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 grow">
            {service.description}
          </p>

          {/* Price and Rating */}
          <div className="mb-4">
            <span className="text-xs sm:text-sm text-gray-600">Price: </span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {service.price}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              aria-label={`Delete ${service.title}`}
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button aria-label={`Edit ${service.title}`} onClick={handleEdit}>
              Edit
            </Button>
            <Button
              className="col-span-2 bg-amber-400 hover:bg-amber-500"
              onClick={() => setIsModalOpen(true)}
            >
              Add Additional Feature
            </Button>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Dialog */}
      <DeleteAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Service?"
        description={`Are you sure you want to delete "${service.title}"? This will also delete all associated additional features. This action cannot be undone.`}
        isLoading={isDeleting}
      />

      {/* Add Additional Features Modal */}
      <AddAdditionalFeaturesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFeature}
        isLoading={isCreatingFeature}
      />
    </>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
