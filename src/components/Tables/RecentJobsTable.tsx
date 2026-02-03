"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

interface Job {
  id: string;
  category: string;
  clientName: string;
  contactNumber: string;
  bookingTime: string;
  status: "Pending" | "In Progress" | "Complete";
}

const jobs: Job[] = [
  {
    id: "CD1002",
    category: "Home Cleaning",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "Pending",
  },
  {
    id: "CD1002",
    category: "Commercial Cleaning",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "In Progress",
  },
  {
    id: "CD1002",
    category: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "Complete",
  },
  {
    id: "CD1002",
    category: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "Pending",
  },
  {
    id: "CD1002",
    category: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "In Progress",
  },
  {
    id: "CD1002",
    category: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "Complete",
  },
  {
    id: "CD1002",
    category: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "Complete",
  },
  {
    id: "CD1002",
    category: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    bookingTime: "Dec 10, 2024-10:30 am",
    status: "In Progress",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Complete":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function RecentJobsTable({title}: {title: string}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
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
                Job ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Booking by time
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
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {job.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {job.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {job.bookingTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="link"
                    asChild
                    className="text-blue-600 hover:text-blue-700 p-0"
                  >
                   <Link href={`/provider/jobs/${job.id}`}> [ Job View ] </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden divide-y divide-gray-100">
        {jobs.map((job, index) => (
          <div key={index} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                {job.id}
              </span>
              <span
                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                  job.status,
                )}`}
              >
                {job.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Category:</span>
                <span className="text-sm text-gray-900">{job.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Client:</span>
                <span className="text-sm text-gray-900">{job.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Contact:</span>
                <span className="text-sm text-gray-900">
                  {job.contactNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Booking:</span>
                <span className="text-sm text-gray-900">{job.bookingTime}</span>
              </div>
            </div>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 p-0 w-full justify-center"
            >
              [ Job View ]
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
