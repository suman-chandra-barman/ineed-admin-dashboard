"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import ServiceHours from "@/components/AddService/ServiceHours";
import BackButton from "@/components/Shared/BackButton";
import AddAdditionalFeaturesModal from "../Modals/AddAdditionalFeaturesModal";
import {
  useCreateServiceMutation,
  useGetAdditionalFeaturesQuery,
  useCreateAdditionalFeatureMutation,
} from "@/redux/features/services/serviceApi";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdServiceId, setCreatedServiceId] = useState<number | null>(null);

  // API hooks
  const [createService, { isLoading: isCreatingService }] =
    useCreateServiceMutation();
  const [createAdditionalFeature, { isLoading: isCreatingFeature }] =
    useCreateAdditionalFeatureMutation();

  // Fetch additional features only if service is created
  const { data: additionalFeaturesData } = useGetAdditionalFeaturesQuery(
    { service_id: createdServiceId! },
    { skip: !createdServiceId },
  );

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

  const handleAddFeature = async (feature: {
    title: string;
    subtitle: string;
    price: number;
    estimateTime: number;
    estimateTimeUnit: string;
    image?: File;
  }) => {
    if (!createdServiceId) {
      toast.error("Please create the service first");
      return;
    }

    if (!feature.image) {
      toast.error("Please upload an image for the additional feature");
      return;
    }

    try {
      await createAdditionalFeature({
        service_id: createdServiceId,
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

  const handleSubmit = async () => {
    // Validation
    if (!serviceName.trim()) {
      toast.error("Please enter service name");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter service description");
      return;
    }
    if (!mainPrice || parseFloat(mainPrice) <= 0) {
      toast.error("Please enter valid main price");
      return;
    }
    if (!offerPrice || parseFloat(offerPrice) <= 0) {
      toast.error("Please enter valid offer price");
      return;
    }
    if (!discount || parseFloat(discount) < 0) {
      toast.error("Please enter valid discount");
      return;
    }
    if (serviceImages.length === 0) {
      toast.error("Please upload at least one service image");
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
        image: serviceImages[0], // Send first image as main image
        service_hours: JSON.stringify(serviceHours),
      }).unwrap();

      toast.success(response.message || "Service created successfully");

      // Store the created service ID to enable adding additional features
      if (response.data?.id) {
        setCreatedServiceId(response.data.id);
        toast.info("You can now add additional features to this service");
      } else {
        // If no ID in response, navigate back
        router.push(`/categories/services/${categoryId}`);
      }
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

  const handleFinish = () => {
    router.push(`/categories/services/${categoryId}`);
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 space-y-6">
      <BackButton title="Add New Service" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section - Name & Description + Service Price + Service Image */}
        <div className="space-y-6">
          {/* Name & description Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Name & description
            </h2>
            {/* Service Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Service Name
              </label>
              <Input
                placeholder="Enter Service Name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                disabled={!!createdServiceId}
              />
            </div>

            {/* Service Description */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Service description
              </label>
              <textarea
                placeholder="Enter service description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px] resize-none"
                disabled={!!createdServiceId}
              />
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
                Main Price
              </label>
              <Input
                placeholder="enter service main price"
                value={mainPrice}
                onChange={(e) => setMainPrice(e.target.value)}
                type="number"
                disabled={!!createdServiceId}
              />
            </div>

            {/* Offer Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Offer Price
              </label>
              <Input
                placeholder="enter service offer price"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                type="number"
                disabled={!!createdServiceId}
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Discount
              </label>
              <Input
                placeholder="enter discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                disabled={!!createdServiceId}
              />
            </div>
          </div>

        
        </div>

        {/* Right Section - Additional Features + Service Hours */}
        <div className="space-y-6">
          {/* Additional Features Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Additional Features
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-primary text-sm font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!createdServiceId}
              >
                Add
              </button>
            </div>

            {!createdServiceId && (
              <p className="text-sm text-gray-500 mb-3">
                Create the service first to add additional features
              </p>
            )}

            <div className="space-y-3">
              {additionalFeaturesData?.data &&
              additionalFeaturesData.data.length > 0 ? (
                additionalFeaturesData.data.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                  >
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
                      <p className="text-xs text-gray-500 truncate">
                        {feature.subtitle}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {feature.estimate_time} {feature.estimate_time_unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-yellow-500">
                        ${feature.additional_features_price}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No additional features added yet
                </p>
              )}
            </div>
          </div>

          {/* Service Hours Section */}
          <ServiceHours onChange={handleServiceHoursChange} />

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
                  Drag your file(s) or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Max 10 MB files are allowed
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={!!createdServiceId}
                />
              </label>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {imagePreviews.slice(0, 3).map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-50 h-35 border border-gray-200 rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={preview}
                        alt={`Service Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={200}
                        height={140}
                      />
                      {!createdServiceId && (
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {/* Show +N overlay on the third image if there are more */}
                      {index === 2 && imagePreviews.length > 3 && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white text-3xl font-bold">
                            +{imagePreviews.length - 3}
                          </span>
                        </div>
                      )}
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
        {!createdServiceId ? (
          <Button
            className="px-8 bg-primary hover:bg-primary"
            onClick={handleSubmit}
            disabled={isCreatingService}
          >
            {isCreatingService ? "Creating..." : "Add Service"}
          </Button>
        ) : (
          <Button
            className="px-8 bg-green-600 hover:bg-green-700"
            onClick={handleFinish}
          >
            Finish
          </Button>
        )}
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
