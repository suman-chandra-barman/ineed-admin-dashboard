import { baseApi } from "@/redux/api/baseApi";
import type {
  AdminChatRoomResponse,
  AdminChatRoomsResponse,
  AdminChatMessagesResponse,
  AdminMarkReadResponse,
} from "@/app/types/admin-chat.type";

export const adminProviderChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdminProviderRoomByBooking: builder.mutation<
      AdminChatRoomResponse,
      number
    >({
      query: (bookingId) => ({
        url: `/bookings/chat/admin-provider/booking/${bookingId}/room/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    createAdminUserRoomByBooking: builder.query<AdminChatRoomResponse, number>({
      query: (bookingId) => ({
        url: `/bookings/chat/booking/${bookingId}/room/?chat_with=user`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getAdminProviderRooms: builder.query<AdminChatRoomsResponse, void>({
      query: () => ({
        url: "/bookings/chat/rooms/",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getAdminProviderMessages: builder.query<AdminChatMessagesResponse, number>({
      query: (roomId) => ({
        url: `/bookings/chat/rooms/${roomId}/messages/`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    markAdminProviderRead: builder.mutation<AdminMarkReadResponse, number>({
      query: (roomId) => ({
        url: `/bookings/chat/rooms/${roomId}/read/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateAdminProviderRoomByBookingMutation,
  useLazyGetAdminProviderRoomsQuery,
  useCreateAdminUserRoomByBookingQuery,
  useLazyCreateAdminUserRoomByBookingQuery,
  useGetAdminProviderRoomsQuery,
  useLazyGetAdminProviderMessagesQuery,
  useMarkAdminProviderReadMutation,
} = adminProviderChatApi;