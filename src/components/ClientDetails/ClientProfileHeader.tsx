"use client";

import React from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 transition-colors"
        >
          <RiDeleteBin6Line className="w-4 h-4" />
          Delete Account
        </button>
      </div>
  );
};
