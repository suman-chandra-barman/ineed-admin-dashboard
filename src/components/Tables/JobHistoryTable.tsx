"use client";

import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { Pagination } from "../Shared/Pagination";
import { JobHistoryItem } from "@/app/types/overview.type";

interface JobHistoryTableProps {
  jobs: JobHistoryItem[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onViewDetails?: (jobId: string) => void;
}

export const JobHistoryTable: React.FC<JobHistoryTableProps> = ({
  jobs,
  totalPages: externalTotalPages,
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange,
  onViewDetails,
}) => {
  const [internalPage, setInternalPage] = useState(1);
  const itemsPerPage = 6;

  // Use external pagination if provided, otherwise paginate locally
  const isExternalPagination =
    externalTotalPages !== undefined &&
    externalCurrentPage !== undefined &&
    externalOnPageChange !== undefined;

  const currentPage = isExternalPagination
    ? externalCurrentPage!
    : internalPage;
  const totalPages = isExternalPagination
    ? externalTotalPages!
    : Math.ceil(jobs.length / itemsPerPage);

  const displayedJobs = isExternalPagination
    ? jobs
    : jobs.slice(
        (internalPage - 1) * itemsPerPage,
        internalPage * itemsPerPage,
      );

  const handlePageChange = (page: number) => {
    if (isExternalPagination) {
      externalOnPageChange!(page);
    } else {
      setInternalPage(page);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-xl border">
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
            {displayedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {job.job_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.provider_name ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.contact_number ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {job.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(job.booking_date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(job.complete_date)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails?.(job.job_id)}
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

      {jobs.length > 0 && (
        <div className="p-6 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {jobs.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No job history found.
        </div>
      )}
    </div>
  );
};
