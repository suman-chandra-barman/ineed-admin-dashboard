"use client";

import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function CategoryCard({ title, description }: CategoryCardProps) {
  return (
    <Link href={`categories/services`}>
      <article className="relative w-full max-w-lg h-80">
        {/* Main Card */}
        <div className="border border-transparent hover:border-primary group h-full shadow relative flex flex-col rounded-3xl bg-white p-4 transition-all duration-300 cursor-pointer">
          {/* Icon Circle */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Building2 className="h-8 w-8" />
          </div>

          {/* Content */}
          <div className="mt-4 flex flex-1 flex-col">
            <h3 className="text-xl md:text-2xl  font-bold text-slate-900 leading-tight text-balance">
              {title}
            </h3>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Arrow Button - Positioned outside bottom-right */}
        <div className="absolute bottom-3 right-3 translate-x-6 translate-y-6 flex h-18 w-18 items-center justify-center rounded-tr-xl rounded-full bg-[#FBFBFB] text-gray-700 transition-all duration-300">
          <Button className="rounded-full w-14 h-14 bg-white text-black hover:text-primary hover:bg-white border  hover:border hover:border-primary">
            <ArrowRight className="w-10" />
          </Button>
        </div>
      </article>
    </Link>
  );
}
