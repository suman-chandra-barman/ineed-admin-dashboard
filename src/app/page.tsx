"use client";

import { StatusCards } from "@/components/Cards/StatusCards";
import { RecentJobsTable } from "@/components/Tables/RecentJobsTable";

const OverviewPage = () => {
  return (
    <main className="h-full space-y-6">
      <StatusCards />
      <RecentJobsTable title="Recent Jobs" />
    </main>
  );
};

export default OverviewPage;
