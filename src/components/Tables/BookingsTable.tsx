"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Pagination } from "../Shared/Pagination";
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useGetBookingsQuery } from "@/redux/features/bookings/bookingApi";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "in_progress":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "assigned":
      return "bg-purple-100 text-purple-700";
    case "draft":
      return "bg-gray-100 text-gray-600";
    case "cancelled":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
  
};

export function BookingsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const router = useRouter();

  const { data, isLoading, isError } = useGetBookingsQuery({
    page: currentPage,
    page_size: itemsPerPage,
    search: searchQuery,
  });

  const bookings = data?.data?.bookings?.results ?? [];
  const totalPages = data?.data?.bookings?.total_pages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (bookingId: number) => {
    router.push(`bookings/job/${bookingId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Booking List</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Loading / Error states */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingSpinner text="Loading bookings..." />
        </div>
      )}
      {isError && (
        <div className="p-8 text-center text-red-500">
          Failed to load bookings. Please try again.
        </div>
      )}

      {/* Table - Desktop */}
      {!isLoading && !isError && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assigned Provider
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
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.booking_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.service_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.date_time ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.assigned_provider ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                        booking.status,
                      )}`}
                    >
                      {booking.status_label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetails(booking.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md"
                      aria-label="View booking details"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cards - Mobile */}
      {!isLoading && !isError && (
        <div className="md:hidden divide-y divide-gray-100">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {booking.booking_id}
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {booking.customer_name}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                    booking.status,
                  )}`}
                >
                  {booking.status_label}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="text-gray-900">{booking.service_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="text-gray-900">
                    {booking.date_time ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="text-gray-900">
                    {booking.assigned_provider ?? "—"}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleViewDetails(booking.id)}
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 p-2 w-full border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="View booking details"
                >
                  <FiEye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && bookings.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results */}
      {!isLoading && !isError && bookings.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No bookings found matching your search.
        </div>
      )}
    </div>
  );
}
