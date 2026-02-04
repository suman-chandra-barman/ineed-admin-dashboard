import React from "react";

interface JobDetailsInfoProps {
  jobId: string;
  category: string;
  bookingDate: string;
}

export default function JobDetailsInfo({
  jobId,
  category,
  bookingDate,
}: JobDetailsInfoProps) {
  return (
    <div className="border rounded-lg p-4">
        {/* Basic Job Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Job Information&apos;s:
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Job id :</span>
              <span className="text-sm font-medium text-gray-500">{jobId}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Job Category :</span>
              <span className="text-sm font-medium text-gray-900">
                {category}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Booking Date :</span>
              <span className="text-sm font-medium text-gray-500">
                {bookingDate}
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}
