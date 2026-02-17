/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { otpVerificationSchema } from "@/schemas/auth.schema";
import { OtpVerificationValues } from "@/types/auth.type";
import { Loader2, Mail } from "lucide-react";
import {
  useVerifyEmailMutation,
  useResendSignupOtpMutation,
} from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const email = searchParams.get("email") || "";
  const expiresAt = searchParams.get("expires") || "";

  // Calculate initial countdown based on expiry time, capped at 5 minutes
  const initialCountdown = useMemo(() => {
    if (expiresAt) {
      const now = new Date().getTime();
      const expires = new Date(expiresAt).getTime();

      if (!isNaN(expires)) {
        const diff = Math.max(0, Math.floor((expires - now) / 1000));
        return Math.min(diff, 300); // Cap at 5 minutes
      }
    }
    return 300; // Default to 5 minutes
  }, [expiresAt]);

  const [countdown, setCountdown] = useState(initialCountdown);
  const [otpValue, setOtpValue] = useState("");

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendSignupOtpMutation();

  const form = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!email) {
      router.push("/signup");
      return;
    }

    // Countdown timer - decrements every second
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [email, router]);

  const onSubmit = async (data: OtpVerificationValues) => {
    if (countdown === 0) {
      toast.error("Verification code has expired. Please request a new code.");
      return;
    }

    try {
      const response = await verifyEmail({
        email_address: email,
        otp_code: data.otp,
      }).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.data.tokens,
          }),
        );
        toast.success("Email verified successfully!");
        router.push("/");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Invalid verification code. Please try again.";
      toast.error(errorMessage);
      console.error("Verification error:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({
        email_address: email,
      }).unwrap();

      if (response.success) {
        const newExpiresAt = response.data.otp_expires_at;

        // Reset countdown to 5 minutes
        setCountdown(300);

        // Update URL with new expiry time
        const params = new URLSearchParams();
        params.set("email", email);
        params.set("expires", newExpiresAt);
        router.replace(`/verify-email?${params.toString()}`);

        toast.success("Verification code resent to your email!");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to resend code. Please try again.";
      toast.error(errorMessage);
      console.error("Resend OTP error:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isExpired = countdown === 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src={logo}
              alt="iNeed Logo"
              className="mx-auto w-32 h-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600 text-sm">
              We&apos;ve sent a 6-digit verification code to
            </p>
            <p className="font-medium text-gray-900 mt-1">{email}</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000000"
                        {...field}
                        maxLength={6}
                        className="text-center text-3xl tracking-[0.5em] font-bold h-14"
                        disabled={isVerifying}
                        onChange={(e) => {
                          field.onChange(e);
                          setOtpValue(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Timer */}
              {countdown > 0 && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Code expires in{" "}
                    <span
                      className={`font-semibold ${
                        countdown < 60 ? "text-red-600" : "text-primary"
                      }`}
                    >
                      {formatTime(countdown)}
                    </span>
                  </p>
                </div>
              )}

              {/* Expired Message */}
              {isExpired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 text-center font-medium">
                    Verification code has expired. Please request a new code.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isVerifying || otpValue.length !== 6 || isExpired}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : isExpired ? (
                  "Code Expired"
                ) : (
                  "Verify Email"
                )}
              </Button>

              {/* Resend Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending || (countdown > 0 && !isExpired)}
                    className="text-primary hover:underline font-semibold disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                  >
                    {isResending ? "Resending..." : "Resend Code"}
                  </button>
                </p>
              </div>
            </form>
          </Form>

          {/* Back to Signup */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Wrong email address?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-semibold"
              >
                Back to Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Make sure to check your spam folder if you don&apos;t see the email
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
