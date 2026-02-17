"use client";

import { useState } from "react";
import { CategoryCard } from "@/components/Cards/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import AddCategoryModal, {
  CategoryData,
} from "@/components/Modals/AddCategoryModal";

function CategoriesPage() {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const handleSaveCategory = (data: CategoryData) => {
    console.log("New category data:", data);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it to the console
  };

  const categories = [
    {
      title: "Residential Services",
      description:
        "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Specialize Cleaning",
      description:
        "We Offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Specialize Cleaning",
      description:
        "We Offer specialized services, including carpet cleaning, window washing, and address specific cleaning needs.",
    },
    {
      title: "Office Cleaning",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Commercial Services",
      description:
        "Keep your workplace clean and pristine with our comprehensive commercial cleaning services.",
    },
    {
      title: "Residential Services",
      description:
        "From regular housekeeping to deep cleaning, we ensure your home is always welcoming and pristine.",
    },
  ];

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <div key={index} className="flex justify-center">
            <CategoryCard
              title={category.title}
              description={category.description}
            />
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={isAddCategoryModalOpen}
        onOpenChange={setIsAddCategoryModalOpen}
        onSave={handleSaveCategory}
      />
    </main>
  );
}
export default CategoriesPage;
