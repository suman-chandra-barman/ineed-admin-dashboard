"use client";

import { ClientProfileHeader } from "@/components/CustomerDetails/ClientProfileHeader";
import { JobHistoryTable } from "@/components/Tables/JobHistoryTable";
import BackButton from "@/components/Shared/BackButton";
import { useRouter } from "next/navigation";
import { ProviderInfo } from "@/components/ProviderDetails/ProviderInfo";

// Mock data - replace with actual data fetching
const clientData = {
  name: "Zara Khan",
  userId: "C-201",
  imageUrl: "/placeholder-avatar.jpg",
  phone: "+1 (555) 123-4567",
  email: "malik.ahmed@service.com",
  address: "123 Main St, New York",
  totalJobs: 16,
  completedJobs: 10,
  pendingJobs: 6,
  availableDays: "Mon-Fri",
  availableTimes: "9:00 AM - 5:00 PM",
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

export default function CustomerDetailsPage() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    // Implement delete account logic
    console.log("Delete account");
  };

  const handleViewJobDetails = (jobId: string) => {
    router.push(`job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl">
      <div className="space-y-6">
        <BackButton title=" Provider Details" />

        <div className="space-y-6 p-6 border rounded-xl">
          <ClientProfileHeader
            name={clientData.name}
            userId={clientData.userId}
            imageUrl={clientData.imageUrl}
            onDelete={handleDeleteAccount}
          />

          {/* Client Info Cards */}
          <ProviderInfo
            phone={clientData.phone}
            email={clientData.email}
            address={clientData.address}
            totalJobs={clientData.totalJobs}
            completedJobs={clientData.completedJobs}
            pendingJobs={clientData.pendingJobs}
            availableDays={clientData.availableDays}
            availableTimes={clientData.availableTimes}
          />
        </div>

        {/* Job History Table */}
       
      </div>
    </div>
  );
}
