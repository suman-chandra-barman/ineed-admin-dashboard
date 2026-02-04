"use client";

import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import UserInfoCard from "../Cards/UserInfoCard";

interface CustomerInfoProps {
  phone: string;
  email: string;
  address: string;
  totalJobs: number;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  phone,
  email,
  address,
  totalJobs,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UserInfoCard
        icon={<FiPhone className="w-5 h-5 text-blue-600" />}
        label="Phone"
        value={phone}
        iconBgColor="bg-blue-100"
      />
      <UserInfoCard
        icon={<FiMail className="w-5 h-5 text-purple-600" />}
        label="Email"
        value={email}
        iconBgColor="bg-purple-100"
      />
      <UserInfoCard
        icon={<FiMapPin className="w-5 h-5 text-green-600" />}
        label="Address"
        value={address}
        iconBgColor="bg-green-100"
      />
      <UserInfoCard
        icon={<MdWorkOutline className="w-5 h-5 text-teal-600" />}
        label="Total Job"
        value={totalJobs}
        iconBgColor="bg-teal-100"
      />
    </div>
  );
};
