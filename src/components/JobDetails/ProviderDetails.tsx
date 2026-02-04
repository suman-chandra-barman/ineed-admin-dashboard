import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderDetailsProps {
  provider: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
    avatar?: string;
  } | null;

  onChatClick?: () => void;
}

export default function ProviderDetails({
  provider,
  onChatClick,
}: ProviderDetailsProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-6">Provider Details :</h2>

      {/* Provider Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={provider ? provider.avatar || "/default-avatar.jpg" : "/default-avatar.jpg"}
            alt={"Provider Avatar"}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Provider Information */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Provider Name</span>
          <span className="text-sm font-medium text-gray-900">
            {provider ? provider.name : "---"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Email</span>
          <span className="text-sm font-medium text-gray-900">
            {provider ? provider.email : "---"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Contact Number</span>
          <span className="text-sm font-medium text-gray-900">
            {provider ? provider.contactNumber : "---"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Address</span>
          <span className="text-sm font-medium text-gray-900">
            {provider ? provider.address : "---"}
          </span>
        </div>
      </div>

      {/* Chat Button */}
      <Button
        onClick={onChatClick}
        className="w-full"
        disabled={!provider}
      >
        <MessageCircle className="w-5 h-5" />
        Chat
      </Button>
    </div>
  );
}
