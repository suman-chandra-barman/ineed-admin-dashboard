import type {
  AdminChatMessageItem,
  AdminChatRoomItem,
} from "@/app/types/admin-chat.type";

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

export function mapAdminProviderRoomToConversation(room: AdminChatRoomItem) {
  const isProviderChat = room.chat_type === "admin_provider";
  // Backend already returns unique IDs with offset applied, no need to encode again
  const roomId = room.id;

  const name = isProviderChat
    ? room.provider_name
    : room.customer_name || "User";

  const avatarUrl = isProviderChat ? room.provider_image : room.customer_image;

  return {
    id: String(roomId),
    roomId,
    bookingId: room.booking_id,
    bookingCode: room.booking_code,
    bookingStatus: room.booking_status,
    chatType: room.chat_type,
    name,
    avatar: getInitials(name),
    avatarUrl,
    lastMessage: room.last_message?.message || "",
    timestamp: formatTime(room.last_message?.created_at || room.updated_at),
    unreadCount: room.unread_count,
    isOnline: false,
    lastSeen: "",
  };
}

export function mapAdminProviderMessageToUI(
  msg: AdminChatMessageItem,
  currentUserId: string,
) {
  const isMine = String(msg.sender) === String(currentUserId);

  return {
    id: String(msg.id),
    senderId: isMine ? "current" : String(msg.sender),
    content: msg.message,
    timestamp: formatTime(msg.created_at),
    isRead: msg.is_read,
    attachment: msg.attachment || null,
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
    attachment: null,
    createdAt: data.created_at,
  };
}
