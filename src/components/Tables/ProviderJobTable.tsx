"use client";

import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { Pagination } from "../Shared/Pagination";

interface ProviderJob {
  jobId: string;
  customerName: string;
  service: string;
  bookingDate: string;
  serviceDate: string;
  status: "Pending" | "In Progress" | "Complete" | "Assigned" | "Requested";
}

interface ProviderJobTableProps {
  title: string;
  jobs: ProviderJob[];
  onViewDetails?: (jobId: string) => void;
  itemsPerPage?: number;
}

const getStatusStyles = (status: ProviderJob["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "In Progress":
      return "bg-cyan-100 text-cyan-700";
    case "Complete":
      return "bg-blue-100 text-blue-700";
    case "Assigned":
      return "bg-purple-100 text-purple-700";
    case "Requested":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const ProviderJobTable: React.FC<ProviderJobTableProps> = ({
  title,
  jobs,
  onViewDetails,
  itemsPerPage = 6,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="rounded-xl border">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Service Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentJobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {job.jobId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.service}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.bookingDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.serviceDate}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails?.(job.jobId)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="View job details"
                  >
                    <FiEye className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
