"use client";

import { Button } from "../ui/button";

interface JobActionsProps {
  jobId: string;
  status: string;
}

export default function JobActions({ jobId, status }: JobActionsProps) {

  const handleCancelJob = () => {
    // Handle cancel job logic
    if (confirm("Are you sure you want to cancel this job?")) {
      console.log("Cancel job:", jobId);
      // Add your cancel job API call here
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Button variant="outline" onClick={handleCancelJob} size="lg">
        Cancel Job
      </Button>

      <Button size="lg" disabled={status === "Pending"}>
        {status === "Completed" ? "Job Completed" : "Change Provider"}
      </Button>
    </div>
  );
}
