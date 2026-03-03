import { baseApi } from "../../api/baseApi";
import {
  GetBookingsRequest,
  GetBookingsResponse,
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
  }),
});

export const { useGetBookingsQuery } = bookingApi;
