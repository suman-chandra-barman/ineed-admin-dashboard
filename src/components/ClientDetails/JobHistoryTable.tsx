"use client";

import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { Pagination } from "../Shared/Pagination";

interface Job {
  jobId: string;
  provider: string;
  contactNumber: string;
  category: string;
  bookingDate: string;
  completeDate: string;
}

interface JobHistoryTableProps {
  jobs: Job[];
  onViewDetails?: (jobId: string) => void;
}

export const JobHistoryTable: React.FC<JobHistoryTableProps> = ({
  jobs,
  onViewDetails,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">All Job History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Complete Date
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
                  {job.provider}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.contactNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.bookingDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.completeDate}
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

      <div className="p-6 border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
