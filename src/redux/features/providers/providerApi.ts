import { baseApi } from "../../api/baseApi";
import {
  GetProvidersRequest,
  GetProvidersResponse,
  GetProviderDetailsResponse,
} from "@/app/types/provider.type";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProviders: builder.query<GetProvidersResponse, GetProvidersRequest>({
      query: ({ page = 1, page_size = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("page_size", page_size.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/bookings/admin/providers/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Providers"],
    }),
    getProviderDetails: builder.query<GetProviderDetailsResponse, string>({
      query: (id) => ({
        url: `/bookings/admin/providers/${id}/`,
        method: "GET",
      }),
      providesTags: ["Providers"],
    }),

    updateProviderStatus: builder.mutation<
      { success: boolean; message: string },
      { normalId: string; is_active?: boolean }
    >({
      query: ({ normalId, is_active = false }) => ({
        url: `/bookings/admin/providers/${normalId}/status/`,
        method: "POST",
        body: { is_active },
      }),
      invalidatesTags: ["Providers"],
    }),
  }),
});

export const {
  useGetProvidersQuery,
  useGetProviderDetailsQuery,
  useUpdateProviderStatusMutation,
} = providerApi;
