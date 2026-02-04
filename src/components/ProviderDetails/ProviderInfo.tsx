"use client";

import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import UserInfoCard from "../Cards/UserInfoCard";
import { CalendarDays, CheckCircle, Clock, Loader } from "lucide-react";

interface ProviderInfoProps {
  phone: string;
  email: string;
  address: string;
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  availableDays: string;
  availableTimes: string;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({
  phone,
  email,
  address,
  totalJobs,
  completedJobs,
  pendingJobs,
  availableDays,
  availableTimes,
}) => {
const userInfo = [
  {
    label: "Phone",
    value: phone,
    icon: <FiPhone className="w-5 h-5 text-blue-600" />,
    iconBgColor: "bg-blue-100",
  },
  {
    label: "Email",
    value: email,
    icon: <FiMail className="w-5 h-5 text-purple-600" />,
    iconBgColor: "bg-purple-100",
  },
  {
    label: "Address",
    value: address,
    icon: <FiMapPin className="w-5 h-5 text-green-600" />,
    iconBgColor: "bg-green-100",
  },
  {
    label: "Total Job",
    value: totalJobs,
    icon: <MdWorkOutline className="w-5 h-5 text-teal-600" />,
    iconBgColor: "bg-teal-100",
  },
  {
    label: "Completed Job",
    value: completedJobs,
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    iconBgColor: "bg-emerald-100",
  },
  {
    label: "Pending Job",
    value: pendingJobs,
    icon: <Loader className="w-5 h-5 text-yellow-600" />,
    iconBgColor: "bg-yellow-100",
  },
  {
    label: "Available Days",
    value: availableDays,
    icon: <CalendarDays className="w-5 h-5 text-indigo-600" />,
    iconBgColor: "bg-indigo-100",
  },
  {
    label: "Available Times",
    value: availableTimes,
    icon: <Clock className="w-5 h-5 text-sky-600" />,
    iconBgColor: "bg-sky-100",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {userInfo.map((info) => (
        <UserInfoCard
          key={info.label}
          icon={info.icon}
          label={info.label}
          value={info.value}
          iconBgColor={info.iconBgColor}
        />
      ))}
    </div>
  );
};
