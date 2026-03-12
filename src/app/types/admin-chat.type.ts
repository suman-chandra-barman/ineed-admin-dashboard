export interface AdminChatLastMessage {
  id: number;
  message: string;
  sender_id: string;
  created_at: string;
}

export type AdminChatType = "admin_provider" | "user_admin";

export interface AdminChatRoomItem {
  id: number;
  chat_type?: AdminChatType;
  booking_id: number;
  booking_code: string;
  booking_status: string;
  customer_name: string;
  customer_image: string | null;
  provider_name: string;
  provider_image: string | null;
  last_message: AdminChatLastMessage | null;
  unread_count: number;
  updated_at: string;
}

export interface AdminChatRoomResponse {
  success: boolean;
  created?: boolean;
  message: string;
  data: AdminChatRoomItem;
}

export interface AdminChatRoomsResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage?: number;
    total_pages?: number;
  };
  data: AdminChatRoomItem[];
}

export interface AdminChatMessageItem {
  id: number;
  room: number;
  sender: string;
  sender_name: string;
  sender_image: string | null;
  message: string;
  attachment?: string | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface AdminChatMessagesResponse {
  success: boolean;
  message: string;
  data: AdminChatMessageItem[];
}

export interface AdminMarkReadResponse {
  success: boolean;
  message: string;
  data: {
    room_id: number;
    updated: number;
  };
}