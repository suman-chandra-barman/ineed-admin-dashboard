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
  DeleteServiceResponse,
  DeleteAdditionalFeatureResponse,
  GetFullServiceResponse,
  UpdateServiceRequest,
  UpdateServiceResponse,
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
          url: `/services/admin/services/?category_id=${category_id}`,
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

        // Append multiple images
        data.images.forEach((image) => {
          formData.append("images", image);
        });

        // Only append service_hours if not empty
        if (data.service_hours && data.service_hours !== "[]") {
          formData.append("service_hours", data.service_hours);
        }

        return {
          url: "/services/admin/services/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Services"],
    }),

    deleteService: builder.mutation<DeleteServiceResponse, number>({
      query: (id) => ({
        url: `/services/admin/services/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),

    deleteAdditionalFeature: builder.mutation<
      DeleteAdditionalFeatureResponse,
      number
    >({
      query: (id) => ({
        url: `/services/admin/additional-features/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdditionalFeatures"],
    }),

    getFullService: builder.query<GetFullServiceResponse, number>({
      query: (id) => ({
        url: `/services/admin/${id}/full/`,
        method: "GET",
      }),
      providesTags: ["Services", "AdditionalFeatures"],
    }),

    updateService: builder.mutation<
      UpdateServiceResponse,
      UpdateServiceRequest
    >({
      query: (data) => {
        const formData = new FormData();
        // formData.append("category_id", data.category_id.toString());
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("main_price", data.main_price);
        formData.append("offer_price", data.offer_price);
        formData.append("discount", data.discount);
        formData.append("service_hours", data.service_hours);

        if (data.delete_gallery_ids && data.delete_gallery_ids.length > 0) {
          data.delete_gallery_ids.forEach((id) => {
            formData.append("delete_gallery_ids", id.toString());
          });
        }

        if (data.images && data.images.length > 0) {
          data.images.forEach((img) => {
            formData.append("images", img);
          });
        }

        return {
          url: `/services/admin/${data.id}/full/`,
          method: "PUT",
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
  useDeleteServiceMutation,
  useDeleteAdditionalFeatureMutation,
  useGetFullServiceQuery,
  useUpdateServiceMutation,
} = serviceApi;
