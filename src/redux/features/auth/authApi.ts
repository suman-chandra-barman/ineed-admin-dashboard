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
} from "@/app/types/auth.type";
import { baseApi } from "../../api/baseApi";
import { updateUser } from "./authSlice";

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
  }),
});

export const {
  useVerifyEmailMutation,
  useGetMeQuery,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
