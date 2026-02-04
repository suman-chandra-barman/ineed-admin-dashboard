import React from "react";
import { FiMap } from "react-icons/fi";

interface JobScheduleLocationProps {
  customer: {
    name: string;
    contact: string;
  };
  schedule: {
    date: string;
    time: string;
    location: {
      city: string;
      zipCode: string;
    };
  };
}

export default function JobScheduleLocation({
  customer,
  schedule,
}: JobScheduleLocationProps) {
  const handleMapClick = () => {
    // Handle map navigation
    console.log("Open map");
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Job Schedule & Locations:
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Customer Name :</span>
          <span className="text-sm font-medium text-gray-500">
            {customer.name}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Contact Number :</span>
          <span className="text-sm font-medium text-gray-500">
            {customer.contact}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Date :</span>
          <span className="text-sm font-medium text-gray-500">
            {schedule.date}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Time :</span>
          <span className="text-sm font-medium text-gray-500">
            {schedule.time}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">City / State :</span>
          <span className="text-sm font-medium text-gray-500">
            {schedule.location.city}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Zip Code :</span>
          <span className="text-sm font-medium text-gray-500">
            {schedule.location.zipCode}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-600">Pin Location :</span>
          <button
            onClick={handleMapClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMap className="w-4 h-4" />
            Map
          </button>
        </div>
      </div>
    </div>
  );
}
