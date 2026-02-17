import {
  loginformSchema,
  signupformSchema,
  otpVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/schemas/auth.schema";
import * as z from "zod";

export type TUserRole = "user" | "provider";
export type LoginFormValues = z.infer<typeof loginformSchema>;
export type SignupFormValues = z.infer<typeof signupformSchema>;
export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;

// API Request Types
export interface SignupRequest {
  full_name: string;
  email_address: string;
  user_role: "user" | "provider";
  password: string;
  confirm_password: string;
}

export interface VerifyEmailRequest {
  email_address: string;
  otp_code: string;
}

export interface ResendOtpRequest {
  email_address: string;
}

// API Response Types
export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    email_address: string;
    user_role: string;
    otp_expires_at: string;
  };
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      full_name: string;
      email_address: string;
      role: string;
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data: {
    email_address: string;
    otp_expires_at: string;
  };
}

// Login Types
export interface LoginRequest {
  email_address: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      full_name: string;
      email_address: string;
      role: string;
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

// Forgot Password Types
export interface ForgotPasswordRequest {
  email_address: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: {
    email_address: string;
    otp_expires_at: string;
  };
}

// Verify Reset OTP Types
export interface VerifyResetOtpRequest {
  email_address: string;
  otp_code: string;
}

export interface VerifyResetOtpResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    full_name: string;
    role: string;
  };
}

// Reset Password Types
export interface ResetPasswordRequest {
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    full_name: string;
    role: string;
  };
}

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
