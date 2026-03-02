"use client";

import { use } from "react";
import { ClientProfileHeader } from "@/components/CustomerDetails/ClientProfileHeader";
import { JobHistoryTable } from "@/components/Tables/JobHistoryTable";
import BackButton from "@/components/Shared/BackButton";
import { useRouter } from "next/navigation";
import { CustomerInfo } from "@/components/CustomerDetails/CustomerInfo";
import { useGetUserDetailsQuery } from "@/redux/features/overview/overviewApi";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";

interface CustomerDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, isError } = useGetUserDetailsQuery(id);

  const handleDeleteAccount = () => {
    console.log("Disable account");
  };

  const handleViewJobDetails = (jobId: string) => {
    router.push(`job/${jobId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl flex items-center justify-center">
        <p className="text-red-500">Failed to load customer details.</p>
      </div>
    );
  }

  const { user, job_history } = data.data;
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const imageUrl = user.image
    ? user.image.startsWith("http")
      ? user.image
      : `${backendBase}${user.image}`
    : "/placeholder-avatar.jpg";

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl">
      <div className="space-y-6">
        <BackButton title=" Customer Details" />

        <div className="space-y-6 p-6 border rounded-xl">
          <ClientProfileHeader
            name={user.full_name}
            userId={user.normal_id}
            imageUrl={imageUrl}
            onDelete={handleDeleteAccount}
          />

          {/* Client Info Cards */}
          <CustomerInfo
            phone={user.phone ?? "—"}
            email={user.email_address}
            address={user.address ?? "—"}
            totalJobs={user.total_job}
          />
        </div>

        {/* Job History Table */}
        <JobHistoryTable
          jobs={job_history.results}
          totalPages={job_history.total_pages}
          onViewDetails={handleViewJobDetails}
        />
      </div>
    </div>
  );
}
