"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { AvailableProvider } from "@/app/types/booking.type";
import Image from "next/image";

interface AssignProviderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (provider: AvailableProvider) => void;
  providers: AvailableProvider[];
  isLoading?: boolean;
  isAssigning?: boolean;
  mode?: "assign" | "change";
}

export default function AssignProviderModal({
  open,
  onOpenChange,
  onAssign,
  providers,
  isLoading = false,
  isAssigning = false,
  mode = "assign",
}: AssignProviderModalProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const selectedProvider = providers.find(
    (p) => p.provider_id === selectedProviderId,
  );

  // Reset selection when modal closes
  useEffect(() => {
    if (!open) {
      setSelectedProviderId("");
    }
  }, [open]);

  const handleAssign = () => {
    if (selectedProvider) {
      onAssign(selectedProvider);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedProviderId("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {mode === "assign" ? "Assign Provider" : "Change Provider"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {/* Service Provider Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Provider
                </label>
                <Select
                  value={selectedProviderId}
                  onValueChange={setSelectedProviderId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500 text-center">
                        No providers available
                      </div>
                    ) : (
                      providers.map((provider) => (
                        <SelectItem
                          key={provider.provider_id}
                          value={provider.provider_id}
                        >
                          {provider.provider_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Provider Details - Show when a provider is selected */}
              {selectedProvider && (
                <div className="space-y-3 pt-2">
                  {/* Provider Image */}
                  {selectedProvider.image && (
                    <div className="flex justify-center mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={
                            selectedProvider.image.startsWith("http")
                              ? selectedProvider.image
                              : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${selectedProvider.image}`
                          }
                          alt={selectedProvider.provider_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 w-40">
                      Provider ID :
                    </label>
                    <span className="text-sm text-gray-600">
                      {selectedProvider.normal_id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 w-40">
                      Provider Name :
                    </label>
                    <span className="text-sm text-gray-600">
                      {selectedProvider.provider_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 w-40">
                      Email :
                    </label>
                    <span className="text-sm text-gray-600">
                      {selectedProvider.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 w-40">
                      Contact Number :
                    </label>
                    <span className="text-sm text-gray-600">
                      {selectedProvider.contact_number}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 w-40">
                      Address :
                    </label>
                    <span className="text-sm text-gray-600">
                      {selectedProvider.address}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 sm:flex-1"
            disabled={isAssigning}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedProviderId || isAssigning || isLoading}
            className="flex-1 sm:flex-1"
          >
            {isAssigning ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {mode === "assign" ? "Assigning..." : "Changing..."}
              </span>
            ) : mode === "assign" ? (
              "Assign"
            ) : (
              "Change Provider"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
