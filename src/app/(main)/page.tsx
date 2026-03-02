"use client";

import { useState } from "react";
import { StatusCards } from "@/components/Cards/StatusCards";
import { RecentUsersTable } from "@/components/Tables/RecentUsersTable";
import { useGetOverviewQuery } from "@/redux/features/overview/overviewApi";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";

const OverviewPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetOverviewQuery({ search, page });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  if (isLoading) {
    return (
      <main className="h-full flex items-center justify-center">
        <LoadingSpinner text="Loading dashboard data..." />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="h-full flex items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </main>
    );
  }

  const cardsData = data?.data.cards;
  const recentUsersData = data?.data.recent_users;

  return (
    <main className="h-full space-y-6">
      <StatusCards data={cardsData} />
      <RecentUsersTable
        users={recentUsersData?.results ?? []}
        totalPages={recentUsersData?.total_pages ?? 1}
        currentPage={page}
        onSearch={handleSearch}
        onPageChange={setPage}
      />
    </main>
  );
};

export default OverviewPage;
