"use client";

import { use } from "react";
import { ClientProfileHeader } from "@/components/CustomerDetails/ClientProfileHeader";
import { ProviderJobTable } from "@/components/Tables/ProviderJobTable";
import BackButton from "@/components/Shared/BackButton";
import { useRouter } from "next/navigation";
import { ProviderInfo } from "@/components/ProviderDetails/ProviderInfo";
import { useGetProviderDetailsQuery } from "@/redux/features/providers/providerApi";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";
import { ProviderJobHistory } from "@/app/types/provider.type";

interface ProviderDetailsPageProps {
  params: Promise<{ id: string }>;
}

type JobStatus =
  | "Pending"
  | "In Progress"
  | "Complete"
  | "Assigned"
  | "Requested"
  | "Cancelled";

const mapJobStatus = (status: string): JobStatus => {
  switch (status.toLowerCase()) {
    case "assigned":
      return "Assigned";
    case "completed":
      return "Complete";
    case "cancelled":
      return "Cancelled";
    case "in_progress":
      return "In Progress";
    case "requested":
      return "Requested";
    default:
      return "Pending";
  }
};

const mapJob = (job: ProviderJobHistory) => ({
  jobId: job.job_id,
  customerName: job.customer_name,
  service: job.service,
  bookingDate: job.booking_date,
  serviceDate: job.service_date,
  status: mapJobStatus(job.status),
});

export default function ProviderDetailsPage({
  params,
}: ProviderDetailsPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, isError } = useGetProviderDetailsQuery(id);

  const handleDeleteAccount = () => {
    console.log("Disable account");
  };

  const handleViewJobDetails = (jobId: string) => {
    router.push(`job/${jobId}`);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading provider details..." />;
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl flex items-center justify-center">
        <p className="text-red-500">Failed to load provider details.</p>
      </div>
    );
  }

  const { provider, today_jobs, job_history } = data.data;
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const imageUrl = provider.image
    ? provider.image.startsWith("http")
      ? provider.image
      : `${backendBase}${provider.image}`
    : "/placeholder-avatar.jpg";

  const todayJobsMapped = today_jobs.map(mapJob);
  const historyJobsMapped = job_history.results.map(mapJob);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl">
      <div className="space-y-6">
        <BackButton title="Provider Details" />

        <div className="space-y-6 p-6 border rounded-xl">
          <ClientProfileHeader
            name={provider.full_name}
            userId={provider.normal_id}
            imageUrl={imageUrl}
            onDelete={handleDeleteAccount}
          />

          {/* Provider Info Cards */}
          <ProviderInfo
            phone={provider.phone ?? "—"}
            email={provider.email_address}
            address={provider.address ?? "—"}
            totalJobs={provider.complete_job + provider.pending_job}
            completedJobs={provider.complete_job}
            pendingJobs={provider.pending_job}
            availableDays={provider.availability_day}
            availableTimes={provider.availability_time}
          />
        </div>

        {/* Today Job History Table */}
        <ProviderJobTable
          title="Today Job History"
          jobs={todayJobsMapped}
          onViewDetails={handleViewJobDetails}
        />

        {/* All Job History Table */}
        <ProviderJobTable
          title="All Job History"
          jobs={historyJobsMapped}
          onViewDetails={handleViewJobDetails}
        />
      </div>
    </div>
  );
}
