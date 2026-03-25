"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Ban, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateAdminProviderRoomByBookingMutation } from "@/redux/features/chat/adminProviderChatApi";

interface ClientProfileHeaderProps {
  name: string;
  userId: string;
  image: string | null;
  todayBookingId?: number | undefined;
  previousBookingId?: number | undefined;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({
  name,
  userId,
  image,
  todayBookingId,
  previousBookingId,
}) => {
  const router = useRouter();

  const [createRoomTrigger] = useCreateAdminProviderRoomByBookingMutation();

  const handleOpenChat = async (bookingId: number) => {
    try {
      const res = await createRoomTrigger(bookingId).unwrap();
      router.push(`/messages?roomId=${res.data.id}`);
    } catch (error) {
      console.error("Failed to open admin/user chat room", error);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Disable account");
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          {image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image}`}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-200 rounded-full w-full h-full flex items-center justify-center uppercase">
              {name.charAt(0)}{" "}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500 mt-1">User ID: {userId}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            const bookingId = todayBookingId ?? previousBookingId;
            if (bookingId !== undefined) handleOpenChat(bookingId);
          }}
          disabled={!todayBookingId && !previousBookingId}
        >
          <MessageCircle className="w-4 h-4" />
          Chat
        </Button>

        <Button onClick={handleDeleteAccount} variant="outline">
          <Ban className="w-4 h-4" />
          Disable Account
        </Button>
      </div>
    </div>
  );
};
