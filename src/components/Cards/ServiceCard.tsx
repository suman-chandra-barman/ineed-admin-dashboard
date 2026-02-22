/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

interface ServiceCardProps {
  service: any;
  priority?: boolean;
}

const ServiceCard = memo(({ service, priority = false }: ServiceCardProps) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <div
        className="relative h-60 sm:h-56 bg-gray-200 overflow-hidden block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`View ${service.title} service details`}
      >
        <Image
          src={service.image}
          alt={`${service.title} service thumbnail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {service.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 grow">
          {service.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs sm:text-sm text-gray-600">Price: </span>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {service.price}
            </span>
          </div>
          <div
            className="flex items-center gap-1"
            aria-label={`Rated ${service.rating} out of 5 stars`}
          >
            <Star
              className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {service.rating}
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" aria-label={`Book ${service.title} now`}>
            Delete
          </Button>
          <Button aria-label={`Book ${service.title} now`}>Edit</Button>
          <Button className="col-span-2 bg-amber-400 hover:bg-amber-500">
            Add Additional Feature
          </Button>
        </div>
      </div>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
