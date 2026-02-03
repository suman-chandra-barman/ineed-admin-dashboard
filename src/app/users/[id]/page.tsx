"use client";

import { ClientProfileHeader } from "@/components/ClientDetails/ClientProfileHeader";
import { ClientInfoCards } from "@/components/Cards/ClientInfoCards";
import { JobHistoryTable } from "@/components/Tables/JobHistoryTable";
import BackButton from "@/components/Shared/BackButton";

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
        <BackButton title="Client Details" />

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
