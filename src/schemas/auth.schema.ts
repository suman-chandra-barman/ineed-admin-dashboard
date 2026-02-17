import * as z from "zod";

export const loginformSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupformSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    userRole: z.string().min(1, { message: "Please select your role" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Onboarding Step 1: Personal Information
export const onboardingStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().optional(),
  contactNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  streetAddress: z
    .string()
    .min(5, { message: "Please enter a valid street address" }),
  city: z.string().min(2, { message: "Please enter a valid city" }),
  state: z.string().min(1, { message: "Please select a state" }),
  zipCode: z.string().min(4, { message: "Please enter a valid ZIP code" }),
});

// Onboarding Step 2: Service Information
export const onboardingStep2Schema = z.object({
  serviceType: z.string().min(1, { message: "Please select a service type" }),
  experienceLevel: z
    .string()
    .min(1, { message: "Please select your experience level" }),
  shortDescription: z.string().optional(),
});

// Onboarding Step 3: Availability
export const onboardingStep3Schema = z.object({
  availableDays: z
    .array(z.string())
    .min(1, { message: "Please select at least one available day" }),
  availableTimes: z
    .array(z.string())
    .min(1, { message: "Please select at least one time slot" }),
});

// Onboarding Step 4: Legal W-9 Information
export const onboardingStep4Schema = z.object({
  legalName: z.string().min(2, { message: "Please enter your legal name" }),
  businessName: z.string().optional(),
  taxType: z.string().min(1, { message: "Please select a tax type" }),
  taxId: z.string().min(1, { message: "Please enter a valid tax ID" }),
  w9StreetAddress: z
    .string()
    .min(5, { message: "Please enter a valid street address" }),
  w9City: z.string().min(2, { message: "Please enter a valid city" }),
  w9State: z.string().min(1, { message: "Please select a state" }),
  w9ZipCode: z.string().min(4, { message: "Please enter a valid ZIP code" }),
});

// Onboarding Step 5: Confirmation
export const onboardingStep5Schema = z.object({
  acknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge and agree to continue",
  }),
});
