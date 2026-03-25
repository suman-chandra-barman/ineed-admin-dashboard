import { baseApi } from "../../api/baseApi";
import {
  OverviewRequest,
  OverviewResponse,
  UserDetailsResponse,
} from "@/app/types/overview.type";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, OverviewRequest>({
      query: ({ search = "", page = 1 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("page", page.toString());
        return {
          url: `/bookings/admin/overview/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Overview"],
    }),

    getUserDetails: builder.query<UserDetailsResponse, string>({
      query: (normalId) => ({
        url: `/bookings/admin/users/${normalId}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Overview", id }],
    }),

    updateUserStatus: builder.mutation<
      { success: boolean; message: string },
      { normalId: string; is_active?: boolean }
    >({
      query: ({ normalId, is_active = false }) => ({
        url: `/bookings/admin/users/${normalId}/status/`,
        method: "POST",
        body: { is_active },
      }),
      invalidatesTags: (_result, _error, { normalId }) => [
        { type: "Overview", id: normalId },
        "Overview",
      ],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetUserDetailsQuery,
  useUpdateUserStatusMutation,
} = overviewApi;
