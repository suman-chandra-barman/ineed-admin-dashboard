"use client";

import React from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBgColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  label,
  value,
  iconBgColor,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
};

interface ClientInfoCardsProps {
  phone: string;
  email: string;
  address: string;
  totalJobs: number;
}

export const ClientInfoCards: React.FC<ClientInfoCardsProps> = ({
  phone,
  email,
  address,
  totalJobs,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoCard
        icon={<FiPhone className="w-5 h-5 text-blue-600" />}
        label="Phone"
        value={phone}
        iconBgColor="bg-blue-100"
      />
      <InfoCard
        icon={<FiMail className="w-5 h-5 text-purple-600" />}
        label="Email"
        value={email}
        iconBgColor="bg-purple-100"
      />
      <InfoCard
        icon={<FiMapPin className="w-5 h-5 text-green-600" />}
        label="Address"
        value={address}
        iconBgColor="bg-green-100"
      />
      <InfoCard
        icon={<MdWorkOutline className="w-5 h-5 text-teal-600" />}
        label="Total Job"
        value={totalJobs}
        iconBgColor="bg-teal-100"
      />
    </div>
  );
};
