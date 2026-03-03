"use client";

import JobDetailsView from "@/components/JobDetails/JobDetailsView";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = Number(params.id);

  return <JobDetailsView jobId={jobId} />;
}
