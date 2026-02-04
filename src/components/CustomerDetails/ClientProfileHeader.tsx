"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Ban, MessageCircle } from "lucide-react";

interface ClientProfileHeaderProps {
  name: string;
  userId: string;
  imageUrl: string;
  onDelete?: () => void;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({
  name,
  userId,
  imageUrl,
  onDelete,
}) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-100">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500 mt-1">User ID: {userId}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button>
          <MessageCircle className="w-4 h-4" />
          Chat
        </Button>
        <Button onClick={onDelete} variant="outline">
          <Ban className="w-4 h-4" />
          Disable Account
        </Button>
      </div>
    </div>
  );
};
