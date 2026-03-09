export interface AdminProviderChatLastMessage {
  id: number;
  message: string;
  sender_id: string;
  created_at: string;
}
export interface AdminProviderChatRoomItem {
  id: number;
  booking_id: number;
  booking_code: string;
  booking_status: string;
  provider_name: string;
  provider_image: string | null;
  last_message: AdminProviderChatLastMessage | null;
  unread_count: number;
  updated_at: string;
}
export interface AdminProviderChatRoomResponse {
  success: boolean;
  created?: boolean;
  message: string;
  data: AdminProviderChatRoomItem;
  ws_url?: string;
}
export interface AdminProviderChatRoomsResponse {
  success: boolean;
  message: string;
  data: AdminProviderChatRoomItem[];
}
export interface AdminProviderChatMessageItem {
  id: number;
  room: number;
  sender: string;
  sender_name: string;
  sender_image: string | null;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}
export interface AdminProviderChatMessagesResponse {
  success: boolean;
  message: string;
  data: AdminProviderChatMessageItem[];
}
export interface AdminProviderMarkReadResponse {
  success: boolean;
  message: string;
  data: {
    room_id: number;
    updated: number;
  };
}