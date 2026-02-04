"use client";

import { useState } from "react";
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

interface Provider {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
}

interface AssignProviderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (providerId: string) => void;
}

// Sample providers data - replace with your actual data source
const providers: Provider[] = [
  {
    id: "1",
    name: "Jony",
    email: "name@gmail.com",
    contact: "+54484513",
    address: "United State",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    contact: "+12345678",
    address: "New York, USA",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "+98765432",
    address: "Los Angeles, USA",
  },
];

export default function AssignProviderModal({
  open,
  onOpenChange,
  onAssign,
}: AssignProviderModalProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const selectedProvider = providers.find((p) => p.id === selectedProviderId);

  const handleAssign = () => {
    if (selectedProviderId) {
      onAssign(selectedProviderId);
      onOpenChange(false);
      setSelectedProviderId("");
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
            Assign Provider
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Provider Details - Show when a provider is selected */}
          {selectedProvider && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 w-40">
                  Provider Name :
                </label>
                <span className="text-sm text-gray-600">
                  {selectedProvider.name}
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
                  {selectedProvider.contact}
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
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 sm:flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedProviderId}
            className="flex-1 sm:flex-1"
          >
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
