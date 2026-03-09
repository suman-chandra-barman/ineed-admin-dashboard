"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Ban, MessageCircle } from "lucide-react";
import { useCreateAdminProviderRoomByBookingMutation } from "@/redux/features/chat/adminProviderChatApi";
import { useRouter } from "next/navigation";
import { encodeAdminProviderRoomId } from "@/lib/admin-provider-chat-mappers";

interface ClientProfileHeaderProps {
  name: string;
  userId: string;
  imageUrl: string;
  todayBookingId?: number | undefined;
  previousBookingId?: number | undefined;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({
  name,
  userId,
  imageUrl,
  todayBookingId,
  previousBookingId,
}) => {
  const router = useRouter();

  const [createRoom, { isLoading: openingChat }] =
    useCreateAdminProviderRoomByBookingMutation();

  const handleOpenChat = async (bookingId: number) => {
    try {
      const res = await createRoom(bookingId).unwrap();
      const syntheticRoomId = encodeAdminProviderRoomId(res.data.id);
      router.push(`/messages?roomId=${syntheticRoomId}`);
    } catch (error) {
      console.error("Failed to open chat room", error);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Disable account");
  };

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
        <Button
          onClick={() => {
            const bookingId = todayBookingId ?? previousBookingId;
            if (bookingId !== undefined) handleOpenChat(bookingId);
          }}
          disabled={!todayBookingId && !previousBookingId}
        >
          <MessageCircle className="w-4 h-4" />
          {openingChat ? "Opening..." : "Chat"}
        </Button>
        <Button onClick={handleDeleteAccount} variant="outline">
          <Ban className="w-4 h-4" />
          Disable Account
        </Button>
      </div>
    </div>
  );
};