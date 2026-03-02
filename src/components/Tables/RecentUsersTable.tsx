"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "../Shared/Pagination";
import { FiEye } from "react-icons/fi";
import { RecentUser } from "@/app/types/overview.type";

interface RecentUsersTableProps {
  users: RecentUser[];
  totalPages: number;
  currentPage: number;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
}

export function RecentUsersTable({
  users,
  totalPages,
  currentPage,
  onSearch,
  onPageChange,
}: RecentUsersTableProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  // Debounce search
  const debounce = useCallback((fn: (val: string) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (val: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(val), delay);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(onSearch, 400), [onSearch]);

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const handleViewDetails = (user: RecentUser) => {
    // Strip leading '#' from normal_id => e.g. "USR886f5809"
    const cleanId = user.normal_id.replace(/^#/, "");
    if (user.role === "provider") {
      router.push(`/providers/${cleanId}`);
    } else {
      router.push(`/customers/${cleanId}`);
    }
  };

  const formatDate = (dateStr: string) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
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
                User ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.normal_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.contact_number ?? "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(user.join_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-md"
                    aria-label="View user details"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {users.map((user) => (
          <div key={user.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                {user.normal_id}
              </span>
              <span className="text-sm text-gray-600 capitalize">
                {user.role}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Name:</span>
                <span className="text-sm text-gray-900">{user.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Email:</span>
                <span className="text-sm text-gray-900">
                  {user.email_address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Contact:</span>
                <span className="text-sm text-gray-900">
                  {user.contact_number ?? "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Join Date:</span>
                <span className="text-sm text-gray-900">
                  {formatDate(user.join_date)}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleViewDetails(user)}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 p-2 w-full border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="View user details"
            >
              <FiEye className="w-4 h-4" />
              <span className="text-sm">View Details</span>
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* No Results */}
      {users.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No users found matching your search.
        </div>
      )}
    </div>
  );
}
