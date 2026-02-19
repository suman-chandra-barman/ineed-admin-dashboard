import { baseApi } from "../../api/baseApi";
import {
  GetServicesRequest,
  GetServicesResponse,
  GetAdditionalFeaturesRequest,
  GetAdditionalFeaturesResponse,
  CreateAdditionalFeatureRequest,
  CreateAdditionalFeatureResponse,
  CreateServiceRequest,
  CreateServiceResponse,
} from "@/app/types/service.type";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<GetServicesResponse, GetServicesRequest>({
      query: ({ category_id, page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/services/admin/services/${category_id}/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Services"],
    }),

    getAdditionalFeatures: builder.query<
      GetAdditionalFeaturesResponse,
      GetAdditionalFeaturesRequest
    >({
      query: ({ service_id }) => ({
        url: `/services/admin/additional-features/list/?service_id=${service_id}`,
        method: "GET",
      }),
      providesTags: ["AdditionalFeatures"],
    }),

    createAdditionalFeature: builder.mutation<
      CreateAdditionalFeatureResponse,
      CreateAdditionalFeatureRequest
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("service_id", data.service_id.toString());
        formData.append(
          "additional_features_title",
          data.additional_features_title,
        );
        formData.append("subtitle", data.subtitle);
        formData.append(
          "additional_features_price",
          data.additional_features_price,
        );
        formData.append(
          "additional_features_image",
          data.additional_features_image,
        );
        formData.append("estimate_time", data.estimate_time);
        formData.append("estimate_time_unit", data.estimate_time_unit);

        return {
          url: "/services/admin/additional-features/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["AdditionalFeatures"],
    }),

    createService: builder.mutation<
      CreateServiceResponse,
      CreateServiceRequest
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("category_id", data.category_id.toString());
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("main_price", data.main_price);
        formData.append("offer_price", data.offer_price);
        formData.append("discount", data.discount);
        formData.append("image", data.image);
        formData.append("service_hours", data.service_hours);

        return {
          url: "/services/admin/create-full-service/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetAdditionalFeaturesQuery,
  useCreateAdditionalFeatureMutation,
  useCreateServiceMutation,
} = serviceApi;
