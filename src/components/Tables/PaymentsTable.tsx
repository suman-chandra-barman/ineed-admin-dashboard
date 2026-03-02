"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Pagination } from "../Shared/Pagination";
import { useGetPaymentsQuery } from "@/redux/features/payments/paymentApi";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "failed":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function PaymentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetPaymentsQuery({
    page: currentPage,
    page_size: itemsPerPage,
    search: searchQuery,
  });

  const payments = data?.data?.payments?.results ?? [];
  const totalPages = data?.data?.payments?.total_pages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">
            Payment Management
          </h2>
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
          <LoadingSpinner text="Loading payments..." />
        </div>
      )}
      {isError && (
        <div className="p-8 text-center text-red-500">
          Failed to load payments. Please try again.
        </div>
      )}

      {/* Table - Desktop */}
      {!isLoading && !isError && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Provider Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-50 truncate">
                    {payment.transaction_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.booking_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.provider_name ?? "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                        payment.payment_status,
                      )}`}
                    >
                      {payment.payment_status}
                    </span>
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
          {payments.map((payment) => (
            <div key={payment.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {payment.transaction_id}
                </span>
                <span
                  className={`inline-flex shrink-0 px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                    payment.payment_status,
                  )}`}
                >
                  {payment.payment_status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Booking ID:</span>
                  <span className="text-sm text-gray-900">
                    {payment.booking_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Provider:</span>
                  <span className="text-sm text-gray-900">
                    {payment.provider_name ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Amount:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${payment.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && payments.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results */}
      {!isLoading && !isError && payments.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No payments found matching your search.
        </div>
      )}
    </div>
  );
}
