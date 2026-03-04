import { baseApi } from "../../api/baseApi";
import {
  GetContactMessagesRequest,
  GetContactMessagesResponse,
} from "@/app/types/support.type";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactMessages: builder.query<
      GetContactMessagesResponse,
      GetContactMessagesRequest
    >({
      query: ({ page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return {
          url: `/services/contact/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Support"],
    }),
  }),
});

export const { useGetContactMessagesQuery } = supportApi;
