"use client";

import { StaticImageData } from "next/image";
import sercice1 from "@/assets/service-1.jpg";
import sercice2 from "@/assets/service-2.jpg";
import sercice3 from "@/assets/service-3.jpg";
import sercice4 from "@/assets/service-4.jpg";
import ServiceCard from "@/components/Cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/Shared/BackButton";

export interface Service {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  price: string;
  rating: number;
  category: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 2,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 3,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 4,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
  {
    id: 5,
    title: "Home Maintenance Service",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice2,
    price: "From $50",
    rating: 4.5,
    category: ["all", "residential"],
  },
  {
    id: 6,
    title: "General Repair Service",
    description:
      "Everyday electronic and device repairs by skilled professionals. Safe, reliable, and hassle-free servic...",
    image: sercice4,
    price: "From $50",
    rating: 4.5,
    category: ["all", "commercial"],
  },
  {
    id: 7,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice1,
    price: "From $50",
    rating: 4.5,
    category: ["all", "move"],
  },
  {
    id: 8,
    title: "Cleaning & Surface Maintenance",
    description:
      "A reliable repair service for everyday maintenance needs, managed and verified by our platform.",
    image: sercice3,
    price: "From $50",
    rating: 4.5,
    category: ["all", "specialty"],
  },
];

export default function ServicesPage() {
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
              className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus /> Add Service
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}
