import { baseApi } from "../../api/baseApi";
import {
  GetCategoriesRequest,
  GetCategoriesResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from "@/app/types/category.type";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, GetCategoriesRequest>({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/services/admin/categories/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<
      CreateCategoryResponse,
      CreateCategoryRequest
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("category_icon_upload", data.category_icon_upload);
        formData.append("category_name", data.category_name);
        formData.append("subtitle", data.subtitle);

        return {
          url: "/services/admin/categories/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
