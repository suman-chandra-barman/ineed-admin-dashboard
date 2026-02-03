"use client";

import { StatusCards } from "@/components/Cards/StatusCards";
import { RecentUsersTable } from "@/components/Tables/RecentUsersTable";

const OverviewPage = () => {
  return (
    <main className="h-full space-y-6">
      <StatusCards />
      <RecentUsersTable />
    </main>
  );
};

export default OverviewPage;
