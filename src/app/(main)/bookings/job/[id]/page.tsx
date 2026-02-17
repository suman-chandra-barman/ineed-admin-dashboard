"use client";

import JobActions from "@/components/JobDetails/JobActions";
import JobDetailsInfo from "@/components/JobDetails/JobDetailsInfo";
import JobScheduleLocation from "@/components/JobDetails/JobScheduleLocation";
import JobServiceInfo from "@/components/JobDetails/JobServiceInfo";
import ServiceImages from "@/components/JobDetails/ServiceImages";
import ProviderDetails from "@/components/JobDetails/ProviderDetails";
import BackButton from "@/components/Shared/BackButton";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  // Mock data - replace with actual API call
  const jobData = {
    jobId: "#CD002",
    category: "Home Cleaning",
    bookingDate: "March 12, 2025",
    description:
      "Please focus on kitchen and bathroom areas. Cleaning supplies are available under the sink.",
    customer: {
      name: "John Doe",
      contact: "+1 345 823 9384",
    },
    schedule: {
      date: "March 12, 2025",
      time: "10:00 AM - 1:00 PM",
      location: {
        city: "Brooklyn, NY",
        zipCode: "11215",
      },
    },
    services: [
      {
        id: "1",
        name: "Inside Refrigerator Cleaning",
        description: "A reliable repair servic...",
        duration: "30 min",
        price: 30,
        image: "/service-placeholder.jpg",
        sub: [],
      },
    ],
    provider: null,
    serviceImages: {
      before: "/before-service.jpg",
      after: "/after-service.jpg",
    },
    status: "Requested",
  };

  const handleChatClick = () => {
    // Handle chat functionality
  };

  return (
    <div className="min-h-screen bg-white p-4 lg:p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <BackButton title=" Job Details" />
        <Button className="ml-4 bg-purple-200 text-purple-700 hover:bg-purple-200">
          {jobData.status}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <JobDetailsInfo
            jobId={jobData.jobId}
            category={jobData.category}
            bookingDate={jobData.bookingDate}
          />
          <JobScheduleLocation
            customer={jobData.customer}
            schedule={jobData.schedule}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ProviderDetails
            provider={jobData.provider}
            onChatClick={handleChatClick}
          />
          <JobServiceInfo services={jobData.services} />
        </div>
      </div>

      {/* Service Images Section */}
      <div className="mt-6">
        <ServiceImages
          beforeImage={jobData.serviceImages.before}
          afterImage={jobData.serviceImages.after}
        />
      </div>

      {/* Action Buttons */}
      <JobActions jobId={jobId} status={jobData.status} />
    </div>
  );
}
