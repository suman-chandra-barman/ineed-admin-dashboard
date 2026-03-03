"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import AssignProviderModal from "../Modals/AssignProviderModal";
import {
  useGetAvailableProvidersQuery,
  useAssignProviderMutation,
  useChangeProviderMutation,
  useCancelJobMutation,
} from "@/redux/features/bookings/bookingApi";
import { AvailableProvider, ProviderDetails } from "@/app/types/booking.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";

interface JobActionsProps {
  bookingId: number;
  status: string;
  providerDetails: ProviderDetails | null;
  onActionComplete?: () => void;
}

export default function JobActions({
  bookingId,
  status,
  providerDetails,
  onActionComplete,
}: JobActionsProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Determine action mode based on status and provider
  const isPending = status === "pending";
  const isAssigned = status === "assigned";
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";
  const hasProvider = !!providerDetails;

  // Can assign provider: status is pending (regardless of provider)
  const canAssignProvider = isPending;
  // Can change provider: status is assigned and has provider
  const canChangeProvider = isAssigned && hasProvider;
  // Can cancel job: status is pending or assigned
  const canCancelJob = isPending || isAssigned;

  const actionMode = canChangeProvider ? "change" : "assign";

  // API hooks
  const { data: providersData, isLoading: isLoadingProviders } =
    useGetAvailableProvidersQuery(bookingId, {
      skip: !isAssignModalOpen,
    });

  const [assignProvider, { isLoading: isAssigning }] =
    useAssignProviderMutation();
  const [changeProvider, { isLoading: isChanging }] =
    useChangeProviderMutation();
  const [cancelJob, { isLoading: isCancelling }] = useCancelJobMutation();

  const handleCancelJob = async () => {
    try {
      const result = await cancelJob(bookingId).unwrap();
      if (result.success) {
        toast.success("Job cancelled successfully");
        onActionComplete?.();
      }
    } catch (error) {
      toast.error("Failed to cancel job");
      console.error("Cancel job error:", error);
    } finally {
      setIsCancelDialogOpen(false);
    }
  };

  const handleProviderAction = async (provider: AvailableProvider) => {
    const requestData = {
      provider_id: provider.normal_id.replace("#", ""),
      provider_name: provider.provider_name,
      email: provider.email,
      contact_number: provider.contact_number,
      address: provider.address,
    };

    try {
      if (isPending) {
        const result = await assignProvider({
          bookingId,
          data: requestData,
        }).unwrap();
        if (result.success) {
          toast.success("Provider assigned successfully");
          onActionComplete?.();
        }
      } else if (canChangeProvider) {
        const result = await changeProvider({
          bookingId,
          data: requestData,
        }).unwrap();
        if (result.success) {
          toast.success("Provider changed successfully");
          onActionComplete?.();
        }
      }
      setIsAssignModalOpen(false);
    } catch (error) {
      toast.error(
        isPending ? "Failed to assign provider" : "Failed to change provider",
      );
      console.error("Provider action error:", error);
    }
  };

  const handleActionClick = () => {
    if (canAssignProvider || canChangeProvider) {
      setIsAssignModalOpen(true);
    }
  };

  const getActionButtonText = () => {
    if (isCompleted) return "Job Completed";
    if (isCancelled) return "Job Cancelled";
    if (canAssignProvider) return "Assign Provider";
    if (canChangeProvider) return "Change Provider";
    return "No Action Available";
  };

  const isActionDisabled =
    isCompleted || isCancelled || (!canAssignProvider && !canChangeProvider);

  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setIsCancelDialogOpen(true)}
          size="lg"
          disabled={!canCancelJob || isCancelling}
        >
          {isCancelling ? "Cancelling..." : "Cancel Job"}
        </Button>

        <Button
          size="lg"
          disabled={isActionDisabled}
          onClick={handleActionClick}
        >
          {getActionButtonText()}
        </Button>
      </div>

      <AssignProviderModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        onAssign={handleProviderAction}
        providers={providersData?.data?.providers || []}
        isLoading={isLoadingProviders}
        isAssigning={isAssigning || isChanging}
        mode={actionMode}
      />

      <AlertDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this job? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelJob}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700"
            >
              {isCancelling ? "Cancelling..." : "Yes, cancel job"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
