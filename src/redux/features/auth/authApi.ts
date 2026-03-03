import {
  VerifyEmailRequest,
  VerifyEmailResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/app/types/auth.type";
import { baseApi } from "../../api/baseApi";
import { setCredentials, updateUser } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (data) => ({
        url: "/auth/verify-email/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetOtp: builder.mutation<
      VerifyResetOtpResponse,
      VerifyResetOtpRequest
    >({
      query: (data) => ({
        url: "/auth/verify-reset-otp/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<
      {
        success: boolean;
        message: string;
        data: {
          user: {
            id: string;
            full_name: string;
            email_address: string;
            role: string;
            profile_image: string | null;
          };
        };
      },
      void
    >({
      query: () => ({
        url: "/auth/me/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data.user));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    updateProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/bookings/admin/profile/",
        method: "PUT",
        body: formData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              updateUser({
                full_name: data.data.full_name,
                profile_image: data.data.image,
              }),
            );
          }
        } catch {
          // silently ignore
        }
      },
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/auth/change-password/",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            // Update tokens in Redux + storage
            const currentUser = (
              getState() as import("@/redux/store").RootState
            ).auth.user;
            if (currentUser) {
              dispatch(
                setCredentials({
                  user: currentUser,
                  tokens: {
                    access: data.accessToken,
                    refresh: data.refreshToken,
                  },
                }),
              );
            }
          }
        } catch {
          // silently ignore
        }
      },
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useGetMeQuery,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
