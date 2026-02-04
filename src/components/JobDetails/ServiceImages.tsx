import Image from "next/image";

interface ServiceImagesProps {
  beforeImage?: string;
  afterImage?: string;
}

export default function ServiceImages({
  beforeImage = "/placeholder-before.jpg",
  afterImage = "/placeholder-after.jpg",
}: ServiceImagesProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Service Images :</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Image */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Before Image</h3>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={beforeImage}
              alt="Before service"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* After Image */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">After Image</h3>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={afterImage}
              alt="After service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
