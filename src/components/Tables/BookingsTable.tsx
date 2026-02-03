"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Pagination } from "../Shared/Pagination";
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  customerName: string;
  serviceType: string;
  dateTime: string;
  assignedProvider: string;
  status: "Requested" | "In Progress" | "Complete" | "Assigned";
}

// Sample data - replace with actual API data
const bookings: Booking[] = [
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Requested",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "In Progress",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Complete",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Assigned",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "In Progress",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Requested",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Assigned",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Requested",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Complete",
  },
  {
    id: "#CD1002",
    customerName: "Zara Khan",
    serviceType: "Home Cleaning",
    dateTime: "27 Jan, 2026 - Afternoon",
    assignedProvider: "Rahim Khan",
    status: "Assigned",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Requested":
      return "bg-amber-100 text-amber-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Complete":
      return "bg-emerald-100 text-emerald-700";
    case "Assigned":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function BookingsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const itemsPerPage = 10;

  // Filter bookings based on search
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.assignedProvider
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (bookingId: string) => {
    // Navigate to booking details page
    const clientId = bookingId.replace("#CD", "");
    router.push(`/bookings/${clientId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Booking Lists</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table - Desktop */}
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
            {currentBookings.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.serviceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.dateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.assignedProvider}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewDetails(booking.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md"
                    aria-label="View customer details"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table - Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {currentBookings.map((booking, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {booking.id}
                </p>
                <p className="text-sm text-gray-900 mt-1">
                  {booking.customerName}
                </p>
              </div>
              <span
                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                  booking.status,
                )}`}
              >
                {booking.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="text-gray-900">{booking.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="text-gray-900">{booking.dateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="text-gray-900">
                  {booking.assignedProvider}
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

      {/* Pagination */}
      <div className="p-6 border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
