import { baseApi } from "@/redux/api/baseApi";
import type {
  AdminProviderChatRoomResponse,
  AdminProviderChatRoomsResponse,
  AdminProviderChatMessagesResponse,
  AdminProviderMarkReadResponse,
} from "@/app/types/admin-chat.type";

export const adminProviderChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdminProviderRoomByBooking: builder.mutation<
      AdminProviderChatRoomResponse,
      number
    >({
      query: (bookingId) => ({
        url: `/bookings/chat/admin-provider/booking/${bookingId}/room/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    getAdminProviderRooms: builder.query<AdminProviderChatRoomsResponse, void>({
      query: () => ({
        url: "/bookings/chat/admin-provider/rooms/",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getAdminProviderMessages: builder.query<
      AdminProviderChatMessagesResponse,
      number
    >({
      query: (roomId) => ({
        url: `/bookings/chat/admin-provider/rooms/${roomId}/messages/`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    markAdminProviderRead: builder.mutation<
      AdminProviderMarkReadResponse,
      number
    >({
      query: (roomId) => ({
        url: `/bookings/chat/admin-provider/rooms/${roomId}/read/`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateAdminProviderRoomByBookingMutation,
  useGetAdminProviderRoomsQuery,
  useLazyGetAdminProviderMessagesQuery,
  useMarkAdminProviderReadMutation,
} = adminProviderChatApi;
