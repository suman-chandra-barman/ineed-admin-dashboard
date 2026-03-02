"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "../Shared/Pagination";
import { FiEye } from "react-icons/fi";
import { useGetProvidersQuery } from "@/redux/features/providers/providerApi";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-100 text-emerald-700";
    case "inactive":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function ProvidersTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetProvidersQuery({
    page: currentPage,
    page_size: itemsPerPage,
    search: searchQuery,
  });

  const providers = data?.data?.providers?.results ?? [];
  const totalPages = data?.data?.providers?.total_pages ?? 1;

  const handleViewDetails = (normalId: string) => {
    const cleanId = normalId.replace(/^#/, "");
    router.push(`/providers/${cleanId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Provider List</h2>
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
          <LoadingSpinner text="Loading providers..." />
        </div>
      )}
      {isError && (
        <div className="p-8 text-center text-red-500">
          Failed to load providers. Please try again.
        </div>
      )}

      {/* Table - Desktop */}
      {!isLoading && !isError && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Availability Day
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Availability Time
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
              {providers.map((provider) => (
                <tr
                  key={provider.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {provider.normal_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.service_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {provider.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {provider.availability_day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {provider.availability_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                        provider.status,
                      )}`}
                    >
                      {provider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewDetails(provider.normal_id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md"
                      aria-label="View provider details"
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
          {providers.map((provider) => (
            <div key={provider.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {provider.normal_id}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                    provider.status,
                  )}`}
                >
                  {provider.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Name:</span>
                  <span className="text-sm text-gray-900">
                    {provider.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Service Type:</span>
                  <span className="text-sm text-gray-900">
                    {provider.service_type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Location:</span>
                  <span className="text-sm text-gray-900">
                    {provider.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    Availability Day:
                  </span>
                  <span className="text-sm text-gray-900">
                    {provider.availability_day}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    Availability Time:
                  </span>
                  <span className="text-sm text-gray-900">
                    {provider.availability_time}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(provider.normal_id)}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 p-2 w-full border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="View provider details"
              >
                <FiEye className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && providers.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results */}
      {!isLoading && !isError && providers.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No providers found matching your search.
        </div>
      )}
    </div>
  );
}
