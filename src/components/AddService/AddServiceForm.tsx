"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import ServiceHours from "@/components/AddService/ServiceHours";
import BackButton from "@/components/Shared/BackButton";
import { useCreateServiceMutation } from "@/redux/features/services/serviceApi";
import { ServiceHour } from "@/app/types/service.type";
import { toast } from "sonner";

interface AddServiceFormProps {
  categoryId: number;
}

export default function AddServiceForm({ categoryId }: AddServiceFormProps) {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [serviceImages, setServiceImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [serviceHours, setServiceHours] = useState<ServiceHour[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // API hooks
  const [createService, { isLoading: isCreatingService }] =
    useCreateServiceMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const totalImages = serviceImages.length + newFiles.length;

      if (totalImages > 10) {
        toast.error("Maximum 10 images allowed");
        return;
      }

      setServiceImages((prev) => [...prev, ...newFiles]);

      // Create previews for new files
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });

      // Clear error if images are added
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }
    }

    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setServiceImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleServiceHoursChange = useCallback((hours: ServiceHour[]) => {
    setServiceHours(hours);
  }, []);

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

    if (serviceImages.length === 0) {
      newErrors.images = "Please upload at least one service image";
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
      const response = await createService({
        category_id: categoryId,
        name: serviceName,
        description: description,
        main_price: mainPrice,
        offer_price: offerPrice,
        discount: discount,
        images: serviceImages,
        service_hours: JSON.stringify(serviceHours),
      }).unwrap();

      toast.success(response.message || "Service created successfully");
      router.push(`/categories/services/${categoryId}`);
    } catch (err) {
      let errorMessage = "Failed to create service";
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

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 space-y-6">
      <BackButton title="Add New Service" />

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
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Service Hours Section */}
          <ServiceHours onChange={handleServiceHoursChange} />

          {/* Service Images Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Service Images <span className="text-red-500">*</span>
            </h2>

            <div className="space-y-4">
              {/* Upload Area */}
              <label
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors min-h-[120px] ${
                  errors.images ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Upload className="w-10 h-10 text-primary mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  Drag your file(s) or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max 10 images, 10 MB each
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {errors.images && (
                <p className="text-red-500 text-xs">{errors.images}</p>
              )}

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={preview}
                        alt={`Service Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={96}
                        height={96}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        type="button"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
          disabled={isCreatingService}
        >
          {isCreatingService ? "Creating..." : "Add Service"}
        </Button>
      </div>
    </div>
  );
}
