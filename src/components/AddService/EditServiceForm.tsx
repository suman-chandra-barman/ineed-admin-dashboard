"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import ServiceHours from "@/components/AddService/ServiceHours";
import BackButton from "@/components/Shared/BackButton";
import AddAdditionalFeaturesModal from "../Modals/AddAdditionalFeaturesModal";
import FeatureCard from "@/components/Cards/FeatureCard";
import {
  useGetFullServiceQuery,
  useUpdateServiceMutation,
  useCreateAdditionalFeatureMutation,
  useDeleteAdditionalFeatureMutation,
} from "@/redux/features/services/serviceApi";
import { ServiceHour } from "@/app/types/service.type";
import { toast } from "sonner";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

interface EditServiceFormProps {
  categoryId: number;
  serviceId: number;
}

export default function EditServiceForm({
  categoryId,
  serviceId,
}: EditServiceFormProps) {
  const router = useRouter();

  console.log("category id", categoryId)

  // API hooks
  const { data, isLoading, error } = useGetFullServiceQuery(serviceId);
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [createAdditionalFeature, { isLoading: isCreatingFeature }] =
    useCreateAdditionalFeatureMutation();
  const [deleteAdditionalFeature] = useDeleteAdditionalFeatureMutation();

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [serviceHours, setServiceHours] = useState<ServiceHour[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form when data loads - use a ref to track if initialized
  const initializedRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data?.data && !initializedRef.current) {
      const service = data.data.service;
      if (service) {
        setServiceName(service.name || "");
        setDescription(service.description || "");
        setMainPrice(service.man_price || "");
        setOfferPrice(service.offer_price || "");
        setDiscount(service.discount || "");
        if (service.image) {
          setImagePreview(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${service.image}`,
          );
        }
      }
      if (data.data.service_hours) {
        setServiceHours(data.data.service_hours);
      }
      initializedRef.current = true;
    }
  }, [data]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setServiceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error if image is added
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
    e.target.value = "";
  };

  const removeImage = () => {
    setServiceImage(null);
    setImagePreview("");
  };

  const handleServiceHoursChange = useCallback((hours: ServiceHour[]) => {
    setServiceHours(hours);
  }, []);

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
        service_id: serviceId,
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

  const handleDeleteFeature = async (featureId: number) => {
    try {
      await deleteAdditionalFeature(featureId).unwrap();
      toast.success("Additional feature deleted successfully");
    } catch (err) {
      let errorMessage = "Failed to delete additional feature";
      if (err && typeof err === "object" && "data" in err) {
        const error = err as { data?: { message?: string } };
        if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!serviceName.trim()) {
      newErrors.serviceName = "Service name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Service description is required";
    }

    if (!mainPrice || parseFloat(mainPrice) <= 0) {
      newErrors.mainPrice = "Please enter valid main price";
    }

    if (!offerPrice || parseFloat(offerPrice) <= 0) {
      newErrors.offerPrice = "Please enter valid offer price";
    }

    if (!discount || parseFloat(discount) < 0) {
      newErrors.discount = "Please enter valid discount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await updateService({
        id: serviceId,
        category_id: categoryId,
        name: serviceName,
        description: description,
        main_price: mainPrice,
        offer_price: offerPrice,
        discount: discount,
        image: serviceImage || undefined,
        service_hours: JSON.stringify(serviceHours),
      }).unwrap();

      toast.success(response.message || "Service updated successfully");
      router.push(`/categories/services/${categoryId}`);
    } catch (err) {
      let errorMessage = "Failed to update service";
      if (err && typeof err === "object" && "data" in err) {
        const error = err as { data?: { message?: string } };
        if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    router.push(`/categories/services/${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 lg:p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-4 lg:p-6">
        <p className="text-red-500 text-center">Failed to load service data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 space-y-6">
      <BackButton title="Edit Service" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Name & description Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Name & description
            </h2>
            {/* Service Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Service Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter Service Name"
                value={serviceName}
                onChange={(e) => {
                  setServiceName(e.target.value);
                  if (errors.serviceName) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.serviceName;
                      return newErrors;
                    });
                  }
                }}
                className={errors.serviceName ? "border-red-500" : ""}
              />
              {errors.serviceName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceName}
                </p>
              )}
            </div>

            {/* Service Description */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Service description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter service description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.description;
                      return newErrors;
                    });
                  }
                }}
                className={`w-full px-3 py-2 border rounded-md min-h-25 resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Service Price Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Service Price
            </h2>

            {/* Main Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Main Price <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="enter service main price"
                value={mainPrice}
                onChange={(e) => {
                  setMainPrice(e.target.value);
                  if (errors.mainPrice) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.mainPrice;
                      return newErrors;
                    });
                  }
                }}
                type="number"
                step="0.01"
                className={errors.mainPrice ? "border-red-500" : ""}
              />
              {errors.mainPrice && (
                <p className="text-red-500 text-xs mt-1">{errors.mainPrice}</p>
              )}
            </div>

            {/* Offer Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Offer Price <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="enter service offer price"
                value={offerPrice}
                onChange={(e) => {
                  setOfferPrice(e.target.value);
                  if (errors.offerPrice) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.offerPrice;
                      return newErrors;
                    });
                  }
                }}
                type="number"
                step="0.01"
                className={errors.offerPrice ? "border-red-500" : ""}
              />
              {errors.offerPrice && (
                <p className="text-red-500 text-xs mt-1">{errors.offerPrice}</p>
              )}
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Discount <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="enter discount"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  if (errors.discount) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.discount;
                      return newErrors;
                    });
                  }
                }}
                type="number"
                step="0.01"
                className={errors.discount ? "border-red-500" : ""}
              />
              {errors.discount && (
                <p className="text-red-500 text-xs mt-1">{errors.discount}</p>
              )}
            </div>
          </div>

          {/* Service Image Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Service Image
            </h2>

            <div className="space-y-4">
              {/* Upload Area */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors min-h-[120px]">
                <Upload className="w-10 h-10 text-primary mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  Drag your file or <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max 10 MB file allowed
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden group">
                  <Image
                    src={imagePreview}
                    alt="Service Preview"
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Additional Features Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Additional Features
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-primary text-sm font-medium hover:underline"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {data?.data?.additional_features &&
              data.data.additional_features.length > 0 ? (
                data.data.additional_features.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    onDelete={handleDeleteFeature}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No additional features added yet
                </p>
              )}
            </div>
          </div>

          {/* Service Hours Section */}
          <ServiceHours
            onChange={handleServiceHoursChange}
            initialHours={serviceHours}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" className="px-8" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="px-8 bg-primary hover:bg-primary"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Service"}
        </Button>
      </div>

      {/* Add Additional Features Modal */}
      <AddAdditionalFeaturesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFeature}
        isLoading={isCreatingFeature}
      />
    </div>
  );
}
