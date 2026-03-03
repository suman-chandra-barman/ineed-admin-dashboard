import Image from "next/image";

interface ServiceImagesProps {
  beforeImages?: string[];
  afterImages?: string[];
}

export default function ServiceImages({
  beforeImages = [],
  afterImages = [],
}: ServiceImagesProps) {
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imagePath}`;
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Service Images :</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Images */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Before Images</h3>
          {beforeImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {beforeImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={getImageUrl(image)}
                    alt={`Before service ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
              <span className="text-gray-400 text-sm">No images available</span>
            </div>
          )}
        </div>

        {/* After Images */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">After Images</h3>
          {afterImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {afterImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={getImageUrl(image)}
                    alt={`After service ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
              <span className="text-gray-400 text-sm">No images available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
