"use client";

import JobActions from "@/components/JobDetails/JobActions";
import JobDetailsInfo from "@/components/JobDetails/JobDetailsInfo";
import JobScheduleLocation from "@/components/JobDetails/JobScheduleLocation";
import JobServiceInfo from "@/components/JobDetails/JobServiceInfo";
import ServiceImages from "@/components/JobDetails/ServiceImages";
import ProviderDetails from "@/components/JobDetails/ProviderDetails";
import BackButton from "@/components/Shared/BackButton";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetBookingDetailQuery } from "@/redux/features/bookings/bookingApi";
import { useCreateAdminProviderRoomByBookingMutation } from "@/redux/features/chat/adminProviderChatApi";

interface JobDetailsViewProps {
  jobId: number;
}

export default function JobDetailsView({ jobId }: JobDetailsViewProps) {
  const router = useRouter();

  const {
    data: bookingResponse,
    isLoading,
    isError,
    refetch,
  } = useGetBookingDetailQuery(jobId, {
    skip: !jobId || isNaN(jobId),
  });

  const [createRoom, { isLoading: openingChat }] =
    useCreateAdminProviderRoomByBookingMutation();

  const bookingData = bookingResponse?.data;

  const handleChatClick = async () => {
    if (bookingData?.id) {
      try {
        const res = await createRoom(bookingData.id).unwrap();
        router.push(`/messages?roomId=${res.data.id}`);
      } catch (error) {
        console.error("Failed to open chat room", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "assigned":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-purple-200 text-purple-700";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 lg:p-6 rounded-2xl flex items-center justify-center">
        <LoadingSpinner text="Loading job details..." />
      </div>
    );
  }

  if (isError || !bookingData) {
    return (
      <div className="min-h-screen bg-white p-4 lg:p-6 rounded-2xl">
        <div className="flex items-center justify-center flex-col gap-4 py-20">
          <p className="text-gray-500">Failed to load job details</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Transform data for child components
  const providerForComponent = bookingData.provider_details
    ? {
        name: bookingData.provider_details.provider_name,
        email: bookingData.provider_details.email,
        contactNumber: bookingData.provider_details.contact_number,
        address: bookingData.provider_details.address,
        avatar: bookingData.provider_details.image,
      }
    : null;

  const scheduleForComponent = {
    customer: {
      name: bookingData.job_schedule_location.customer_name,
      contact: bookingData.job_schedule_location.contact_number,
    },
    schedule: {
      date: bookingData.job_schedule_location.date,
      time: bookingData.job_schedule_location.time,
      location: {
        city: bookingData.job_schedule_location.city_state || "---",
        zipCode: bookingData.job_schedule_location.zip_code,
      },
    },
  };

  const servicesForComponent = bookingData.service_information.items.map(
    (item) => ({
      id: item.id.toString(),
      name: item.service_name,
      description: `Duration: ${item.duration}`,
      duration: item.duration,
      price: item.price,
    }),
  );

  return (
    <div className="min-h-screen bg-white p-4 lg:p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <BackButton title=" Job Details" />
        <Button
          className={`ml-4 ${getStatusColor(bookingData.status)} hover:opacity-90`}
        >
          {formatStatus(bookingData.status)}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <JobDetailsInfo
            jobId={bookingData.job_information.job_id}
            category={bookingData.job_information.job_category || "---"}
            bookingDate={bookingData.job_information.booking_date}
          />
          <JobScheduleLocation
            customer={scheduleForComponent.customer}
            schedule={scheduleForComponent.schedule}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ProviderDetails
            provider={providerForComponent}
            onChatClick={handleChatClick}
          />
          <JobServiceInfo services={servicesForComponent} />
        </div>
      </div>

      {/* Service Images Section */}
      <div className="mt-6">
        <ServiceImages
          beforeImages={bookingData.service_images.before}
          afterImages={bookingData.service_images.after}
        />
      </div>

      {/* Action Buttons */}
      <JobActions
        bookingId={jobId}
        status={bookingData.status}
        providerDetails={bookingData.provider_details}
        onActionComplete={() => refetch()}
      />
    </div>
  );
}
