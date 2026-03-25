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

  const handleViewJobDetails = (jobId: number) => {
    router.push(`job/${jobId}`);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading customer details..." />;
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl flex items-center justify-center">
        <p className="text-red-500">Failed to load customer details.</p>
      </div>
    );
  }

  const { user, job_history } = data.data;

  console.log("Customer details data:", data.data);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 rounded-2xl">
      <div className="space-y-6">
        <BackButton title=" Customer Details" />

        <div className="space-y-6 p-6 border rounded-xl">
          <ClientProfileHeader
            name={user.full_name}
            userId={user.normal_id}
            image={user.image}
            userRole={user.role}
            previousBookingId={
              job_history.results.length > 0
                ? job_history.results[0].id
                : undefined
            }
            provider={job_history.results.some((job) =>
              Boolean(job.provider_name),
            )}
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
