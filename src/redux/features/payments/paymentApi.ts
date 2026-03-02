import { baseApi } from "../../api/baseApi";
import {
  GetPaymentsRequest,
  GetPaymentsResponse,
} from "@/app/types/payment.type";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<GetPaymentsResponse, GetPaymentsRequest>({
      query: ({ page = 1, page_size = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("page_size", page_size.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/bookings/admin/payments/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Payments"],
    }),
  }),
});

export const { useGetPaymentsQuery } = paymentApi;
