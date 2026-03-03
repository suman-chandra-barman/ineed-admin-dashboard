import { baseApi } from "../../api/baseApi";
import {
  GetBookingsRequest,
  GetBookingsResponse,
  GetBookingDetailResponse,
  GetAvailableProvidersResponse,
  AssignProviderRequest,
  AssignProviderResponse,
  ChangeProviderRequest,
  ChangeProviderResponse,
  CancelJobResponse,
} from "@/app/types/booking.type";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<GetBookingsResponse, GetBookingsRequest>({
      query: ({ page = 1, page_size = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("page_size", page_size.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/bookings/admin/bookings/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Bookings"],
    }),

    // Get single booking detail
    getBookingDetail: builder.query<GetBookingDetailResponse, number>({
      query: (id) => ({
        url: `/bookings/admin/bookings/${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Bookings", id }],
    }),

    // Get available providers for a booking
    getAvailableProviders: builder.query<GetAvailableProvidersResponse, number>(
      {
        query: (bookingId) => ({
          url: `/bookings/admin/bookings/${bookingId}/available-providers/`,
          method: "GET",
        }),
      },
    ),

    // Assign provider to a booking
    assignProvider: builder.mutation<
      AssignProviderResponse,
      { bookingId: number; data: AssignProviderRequest }
    >({
      query: ({ bookingId, data }) => ({
        url: `/bookings/admin/${bookingId}/assign-provider/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        { type: "Bookings", id: bookingId },
        "Bookings",
      ],
    }),

    // Change provider for a booking
    changeProvider: builder.mutation<
      ChangeProviderResponse,
      { bookingId: number; data: ChangeProviderRequest }
    >({
      query: ({ bookingId, data }) => ({
        url: `/bookings/admin/bookings/${bookingId}/change-provider/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { bookingId }) => [
        { type: "Bookings", id: bookingId },
        "Bookings",
      ],
    }),

    // Cancel job
    cancelJob: builder.mutation<CancelJobResponse, number>({
      query: (bookingId) => ({
        url: `/bookings/admin/bookings/${bookingId}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, bookingId) => [
        { type: "Bookings", id: bookingId },
        "Bookings",
      ],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailQuery,
  useGetAvailableProvidersQuery,
  useAssignProviderMutation,
  useChangeProviderMutation,
  useCancelJobMutation,
} = bookingApi;
