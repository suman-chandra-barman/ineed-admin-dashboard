"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import ServiceHours from "@/components/AddService/ServiceHours";
import BackButton from "@/components/Shared/BackButton";
import AddAdditionalFeaturesModal from "../Modals/AddAdditionalFeaturesModal";

interface AdditionalFeature {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  estimateTime: number;
  image?: string;
}

export default function AddServiceForm() {
  const [category, setCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [serviceImages, setServiceImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalFeatures, setAdditionalFeatures] = useState<
    AdditionalFeature[]
  >([
    {
      id: 1,
      title: "Inside Refrigerator Cleaning",
      subtitle: "Professional service cleaning, managed and verified by...",
      price: 30,
      estimateTime: 30,
      image: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "Inside Refrigerator Cleaning",
      subtitle: "Professional service cleaning, managed and verified by...",
      price: 30,
      estimateTime: 30,
      image: "/placeholder.jpg",
    },
    {
      id: 3,
      title: "Inside Refrigerator Cleaning",
      subtitle: "Professional service cleaning, managed and verified by...",
      price: 30,
      estimateTime: 30,
      image: "/placeholder.jpg",
    },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setServiceImages([...serviceImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const handleAddFeature = (feature: Omit<AdditionalFeature, "id">) => {
    const newFeature = {
      ...feature,
      id: additionalFeatures.length + 1,
    };
    setAdditionalFeatures([...additionalFeatures, newFeature]);
    setIsModalOpen(false);
  };

  const removeFeature = (id: number) => {
    setAdditionalFeatures(additionalFeatures.filter((f) => f.id !== id));
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

            {/* Service Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Service Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">--Select Category</option>
                <option value="cleaning">Cleaning</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Service Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-primary mb-2">
                Service Name
              </label>
              <Input
                placeholder="Enter Service Name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
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
                className="text-primary text-sm font-medium hover:underline"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg relative group"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                    {feature.image && (
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {feature.subtitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {feature.estimateTime} min
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-yellow-500">
                      ${feature.price}
                    </span>
                    <button
                      onClick={() => removeFeature(feature.id)}
                      className="mt-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Hours Section */}
          <ServiceHours />
        </div>
      </div>

      {/* Service Image Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm ">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Service Image
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Upload Area */}
          {serviceImages.length < 10 && (
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors min-h-[150px]">
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
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}

          {/* Image Previews */}
          {serviceImages.map((image, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg overflow-hidden group min-h-[150px]"
            >
              <Image
                src={image}
                alt={`Service ${index + 1}`}
                className="w-full h-full object-cover"
                width={150}
                height={150}
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index > 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xl font-semibold">
                  {serviceImages.length - 3}+
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" className="px-8">
          Cancel
        </Button>
        <Button className="px-8 bg-primary hover:bg-primary">
          Add Service
        </Button>
      </div>

      {/* Add Additional Features Modal */}
      <AddAdditionalFeaturesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFeature}
      />
    </div>
  );
}
