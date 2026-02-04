import React from "react";
import Image from "next/image";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

interface JobServiceInfoProps {
  services: Service[];
}

export default function JobServiceInfo({ services }: JobServiceInfoProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Service Information&apos;s:
      </h3>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Service Image and Details */}
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {service.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-blue-600">
                  ${service.price}
                </div>
                <div className="text-xs text-gray-500">Starting From</div>
              </div>
            </div>

            {/* Duration */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {service.name}
                </span>
                <span className="text-sm font-bold text-yellow-500">
                  ${service.price}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {service.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
