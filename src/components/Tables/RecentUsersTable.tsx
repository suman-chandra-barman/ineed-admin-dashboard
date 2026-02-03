"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Pagination } from "../Shared/Pagination";
import { FiEye } from "react-icons/fi";

interface User {
  id: string;
  role: "Customer" | "Provider";
  email: string;
  contactNumber: string;
  joinDate: string;
}

const users: User[] = [
  {
    id: "#CDI002",
    role: "Customer",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Provider",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Customer",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Provider",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Customer",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Provider",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Customer",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Provider",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Customer",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
  {
    id: "#CDI002",
    role: "Provider",
    email: "name@gmail.com",
    contactNumber: "+1 265 0231",
    joinDate: "Dec 10, 2024 - 10:30 am",
  },
];

export function RecentUsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contactNumber.includes(searchQuery),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Recent User</h2>
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
                User ID
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
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
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
        {currentUsers.map((user, index) => (
          <div key={index} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                {user.id}
              </span>
              <span className="text-sm text-gray-600">{user.role}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Email:</span>
                <span className="text-sm text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Contact:</span>
                <span className="text-sm text-gray-900">
                  {user.contactNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Join Date:</span>
                <span className="text-sm text-gray-900">{user.joinDate}</span>
              </div>
            </div>
            <button
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
      {filteredUsers.length > 0 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* No Results */}
      {filteredUsers.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No users found matching your search.
        </div>
      )}
    </div>
  );
}
