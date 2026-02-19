"use client";

import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import AddCategoryModal, {
  CategoryData,
} from "@/components/Modals/AddCategoryModal";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from "@/redux/features/categories/categoryApi";
import { Pagination } from "@/components/Shared/Pagination";
import { toast } from "sonner";

function CategoriesPage() {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const limit = 10;

  // Fetch categories
  const { data, isLoading, error } = useGetCategoriesQuery({
    page,
    limit,
    search,
  });

  // Create category mutation
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSaveCategory = async (categoryData: CategoryData) => {
    if (!categoryData.icon) {
      toast.error("Please upload a category icon");
      return;
    }

    try {
      const response = await createCategory({
        category_icon_upload: categoryData.icon,
        category_name: categoryData.categoryName,
        subtitle: categoryData.subtitle,
      }).unwrap();

      toast.success(response.message || "Category created successfully");
      setIsAddCategoryModalOpen(false);
    } catch (err) {
      let errorMessage = "Failed to create category";
      if (err && typeof err === "object" && "data" in err) {
        const error = err as { data?: { message?: string } };
        if (error.data?.message) {
          errorMessage = error.data.message;
        }
      }
      toast.error(errorMessage);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <main className="bg-white rounded-xl p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Service Management
        </h1>
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
            onClick={() => setIsAddCategoryModalOpen(true)}
          >
            <Plus /> Add Category
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 animate-pulse h-[70vh] flex items-center justify-center">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load categories</p>
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && !error && data && (
        <>
          {data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.data.map((category) => (
                <div key={category.id}>
                  <CategoryCard
                    id={category.id}
                    iconUrl={category.category_icon_upload}
                    title={category.category_name}
                    description={category.subtitle}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No categories found</p>
            </div>
          )}

          {/* Pagination */}
          {data.meta.totalPage > 1 && (
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

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
        onSave={handleSaveCategory}
        isLoading={isCreating}
      />
    </main>
  );
}
export default CategoriesPage;
