"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Pagination } from "../Shared/Pagination";
import { useGetContactMessagesQuery } from "@/redux/features/support/supportApi";
import { LoadingSpinner } from "../Shared/LoadingSpinner";

export function SupportTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetContactMessagesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const messages = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

  const filteredMessages = searchQuery
    ? messages.filter(
        (msg) =>
          msg.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.email_address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : messages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Support Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or email"
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
          <LoadingSpinner text="Loading messages..." />
        </div>
      )}
      {isError && (
        <div className="p-8 text-center text-red-500">
          Failed to load support messages. Please try again.
        </div>
      )}

      {/* Table - Desktop */}
      {!isLoading && !isError && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Agreed
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {msg.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {msg.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {msg.email_address}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p className="line-clamp-2">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        msg.is_agreed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {msg.is_agreed ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(msg.created_at)}
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
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {msg.full_name}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    msg.is_agreed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {msg.is_agreed ? "Agreed" : "Not Agreed"}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Email:</span>
                  <span className="text-sm text-gray-900">
                    {msg.email_address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Date:</span>
                  <span className="text-sm text-gray-900">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">Message:</span>
                  <p className="text-sm text-gray-900">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && filteredMessages.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results */}
      {!isLoading && !isError && filteredMessages.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No support messages found.
        </div>
      )}
    </div>
  );
}
