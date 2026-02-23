import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
  variant?: "default" | "grid" | "table";
  columns?: number;
}

export function LoadingSpinner({
  className,
  text = "Loading...",
  variant = "default",
  columns = 4,
}: LoadingSpinnerProps) {
  if (variant === "grid") {
    return (
      <div className={cn("space-y-4", className)}>
        <div
          className={cn(
            "grid gap-4",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-45 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Default variant - centered spinner
  return (
    <div className={cn("flex h-[70vh] items-center justify-center", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Skeleton className="h-3 w-3 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <Skeleton className="h-3 w-3 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <Skeleton className="h-3 w-3 rounded-full animate-bounce" />
        </div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
