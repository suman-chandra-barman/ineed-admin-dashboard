"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { ClientProfileHeader } from "@/components/ClientDetails/ClientProfileHeader";
import { ClientInfoCards } from "@/components/ClientDetails/ClientInfoCards";
import { JobHistoryTable } from "@/components/ClientDetails/JobHistoryTable";

// Mock data - replace with actual data fetching
const clientData = {
  name: "Zara Khan",
  userId: "C-201",
  imageUrl: "/placeholder-avatar.jpg", // Replace with actual image
  phone: "+1 (555) 123-4567",
  email: "malik.ahmed@service.com",
  address: "123 Main St, New York",
  totalJobs: 16,
};

const jobHistoryData = [
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
  {
    jobId: "J-9021",
    provider: "Jhon Carter",
    contactNumber: "+1 (555) 123-4567",
    category: "Special Cleaning",
    bookingDate: "25 Jun, 2024",
    completeDate: "25 Jun, 2024",
  },
];

export default function ClientDetailsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic
    console.log("Delete account");
  };

  const handleViewJobDetails = (jobId: string) => {
    // Navigate to job details page
    console.log("View job details:", jobId);
    // router.push(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen ">
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
            aria-label="Go back"
          >
            <IoArrowBack className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Client Details</h1>
        </div>

        <div className="space-y-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {/* Client Profile Header */}
          <ClientProfileHeader
            name={clientData.name}
            userId={clientData.userId}
            imageUrl={clientData.imageUrl}
            onDelete={handleDeleteAccount}
          />

          {/* Client Info Cards */}
          <ClientInfoCards
            phone={clientData.phone}
            email={clientData.email}
            address={clientData.address}
            totalJobs={clientData.totalJobs}
          />
        </div>

        {/* Job History Table */}
        <JobHistoryTable
          jobs={jobHistoryData}
          onViewDetails={handleViewJobDetails}
        />
      </div>
    </div>
  );
}
