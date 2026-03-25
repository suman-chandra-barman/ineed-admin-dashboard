"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Ban, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCreateAdminProviderRoomByBookingMutation,
  useCreateAdminUserRoomByBookingQuery,
} from "@/redux/features/chat/adminProviderChatApi";
import { useUpdateUserStatusMutation } from "@/redux/features/overview/overviewApi";
import { useUpdateProviderStatusMutation } from "@/redux/features/providers/providerApi";
import { toast } from "sonner";

interface ClientProfileHeaderProps {
  name: string;
  userId: string;
  image: string | null;
  userRole: string;
  todayBookingId?: number | undefined;
  previousBookingId?: number | undefined;
  provider?: boolean;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({
  name,
  userId,
  image,
  todayBookingId,
  previousBookingId,
  provider = true,
  userRole,
}) => {
  const router = useRouter();
  const bookingId = todayBookingId ?? previousBookingId;

  const [createRoomTrigger] = useCreateAdminProviderRoomByBookingMutation();
  const [updateUserStatus, { isLoading: isDisablingUser }] =
    useUpdateUserStatusMutation();
  const [updateProviderStatus, { isLoading: isDisablingProvider }] =
    useUpdateProviderStatusMutation();
  const { data: userRoomData } = useCreateAdminUserRoomByBookingQuery(
    bookingId ?? 0,
    {
      skip: userRole !== "user" || bookingId === undefined,
    },
  );

  const handleOpenChat = async (targetBookingId: number) => {
    try {
      if (userRole === "user") {
        if (userRoomData?.data.id) {
          router.push(`/messages?roomId=${userRoomData.data.id}`);
        }
      } else if (userRole === "provider") {
        const res = await createRoomTrigger(targetBookingId).unwrap();
        router.push(`/messages?roomId=${res.data.id}`);
      }
    } catch (error) {
      console.error("Failed to open admin/user chat room", error);
    }
  };

  const sanitizedId = userId.replace(/^#/, "");
  const isDisabling = isDisablingUser || isDisablingProvider;

  const handleDisableAccount = async () => {
    try {
      if (userRole === "user") {
        await updateUserStatus({
          normalId: sanitizedId,
          is_active: false,
        }).unwrap();
        toast.success("User account disabled");
      } else if (userRole === "provider") {
        await updateProviderStatus({
          normalId: sanitizedId,
          is_active: false,
        }).unwrap();
        toast.success("Provider account disabled");
      } else {
        toast.error("Unsupported role for disable action");
      }
    } catch (error) {
      console.error("Failed to disable account", error);
      toast.error("Failed to disable account");
    }
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
            if (bookingId !== undefined) handleOpenChat(bookingId);
          }}
          disabled={(!todayBookingId && !previousBookingId) || !provider}
        >
          <MessageCircle className="w-4 h-4" />
          Chat
        </Button>

        <Button
          onClick={handleDisableAccount}
          variant="outline"
          disabled={isDisabling}
        >
          <Ban className="w-4 h-4" />
          {isDisabling ? "Disabling..." : "Disable Account"}
        </Button>
      </div>
    </div>
  );
};
