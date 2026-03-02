import { baseApi } from "../../api/baseApi";
import {
  GetCustomersRequest,
  GetCustomersResponse,
} from "@/app/types/customer.type";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, GetCustomersRequest>({
      query: ({ page = 1, page_size = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("page_size", page_size.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/bookings/admin/user-list/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetCustomersQuery } = customerApi;
