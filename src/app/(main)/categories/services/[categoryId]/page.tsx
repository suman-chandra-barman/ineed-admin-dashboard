"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ServiceCard from "@/components/Cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/Shared/BackButton";
import { Pagination } from "@/components/Shared/Pagination";
import { useGetServicesQuery } from "@/redux/features/services/serviceApi";
import { LoadingSpinner } from "@/components/Shared/LoadingSpinner";

export default function ServicesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params.categoryId);
  const limit = 10;

  // Fetch services
  const { data, isLoading, error } = useGetServicesQuery({
    category_id: categoryId,
    page,
    limit,
    search,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddService = () => {
    router.push(`/categories/services/${categoryId}/add-service`);
  };

  // Normalize data.data to always be an array
  const services = Array.isArray(data?.data)
    ? data.data
    : data?.data
      ? [data.data]
      : [];

  return (
    <main className="bg-white rounded-xl p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <BackButton title="Category Base Services" />
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={handleAddService}
          >
            <Plus /> Add Service
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner variant="grid" columns={4} />}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load services</p>
        </div>
      )}

      {/* Services Grid */}
      {!isLoading && !error && data && (
        <>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={{
                    id: service.id,
                    category_id: service.category_id,
                    title: service.name,
                    description: service.description,
                    image: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${service.image}`,
                    price: `From $${service.offer_price}`,
                    category: ["all"],
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No services found</p>
            </div>
          )}

          {/* Pagination */}
          {data.meta?.totalPage > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={data.meta.totalPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
