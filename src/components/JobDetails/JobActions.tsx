"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import AssignProviderModal from "../Modals/AssignProviderModal";

interface JobActionsProps {
  jobId: string;
  status: string;
}

export default function JobActions({ jobId, status }: JobActionsProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const handleCancelJob = () => {
    // Handle cancel job logic
    if (confirm("Are you sure you want to cancel this job?")) {
      console.log("Cancel job:", jobId);
      // Add your cancel job API call here
    }
  };

  const handleAssignProvider = (providerId: string) => {
    console.log("Assigning provider:", providerId, "to job:", jobId);
    // Add your assign provider API call here
  };

  const handleActionClick = () => {
    if (status === "Requested") {
      setIsAssignModalOpen(true);
    } else if (status !== "Completed" && status !== "Pending") {
      // Handle change provider
      setIsAssignModalOpen(true);
    }
  };

  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button variant="outline" onClick={handleCancelJob} size="lg">
          Cancel Job
        </Button>

        <Button
          size="lg"
          disabled={status === "Pending" || status === "Completed"}
          onClick={handleActionClick}
        >
          {status === "Completed"
            ? "Job Completed"
            : status === "Requested"
              ? "Assign Provider"
              : "Change Provider"}
        </Button>
      </div>

      <AssignProviderModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        onAssign={handleAssignProvider}
      />
    </>
  );
}
