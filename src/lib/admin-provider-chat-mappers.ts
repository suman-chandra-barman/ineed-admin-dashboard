import type {
  AdminProviderChatMessageItem,
  AdminProviderChatRoomItem,
} from "@/app/types/admin-chat.type";

export const ADMIN_PROVIDER_ROOM_ID_OFFSET = 1000000000;

export function encodeAdminProviderRoomId(roomId: number) {
  return ADMIN_PROVIDER_ROOM_ID_OFFSET + Number(roomId);
}

function formatTime(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name?: string | null) {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function mapAdminProviderRoomToConversation(
  room: AdminProviderChatRoomItem,
) {
  const syntheticRoomId = encodeAdminProviderRoomId(room.id);

  return {
    id: String(syntheticRoomId),
    roomId: syntheticRoomId,
    bookingId: room.booking_id,
    bookingCode: room.booking_code,
    bookingStatus: room.booking_status,
    name: room.provider_name,
    avatar: getInitials(room.provider_name),
    avatarUrl: room.provider_image,
    lastMessage: room.last_message?.message || "",
    timestamp: formatTime(room.last_message?.created_at || room.updated_at),
    unreadCount: room.unread_count,
    isOnline: false,
    lastSeen: "",
  };
}

export function mapAdminProviderMessageToUI(
  msg: AdminProviderChatMessageItem,
  currentUserId: string,
) {
  const isMine = String(msg.sender) === String(currentUserId);

  return {
    id: String(msg.id),
    senderId: isMine ? "current" : String(msg.sender),
    content: msg.message,
    timestamp: formatTime(msg.created_at),
    isRead: msg.is_read,
    createdAt: msg.created_at,
  };
}

export function mapAdminProviderSocketMessageToUI(
  data: {
    message_id: number;
    message: string;
    created_at: string;
    sender: { id: string; name: string };
  },
  currentUserId: string,
) {
  const isMine = String(data.sender.id) === String(currentUserId);

  return {
    id: String(data.message_id),
    senderId: isMine ? "current" : String(data.sender.id),
    content: data.message,
    timestamp: formatTime(data.created_at),
    isRead: false,
    createdAt: data.created_at,
  };
}