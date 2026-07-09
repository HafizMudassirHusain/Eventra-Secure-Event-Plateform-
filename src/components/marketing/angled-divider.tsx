import { cn } from "@/lib/utils";

export function AngledDivider({
  flip = false,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-16 w-full overflow-hidden sm:h-24", className)}>
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className={cn("h-full w-full text-border", flip && "scale-y-[-1]")}
      >
        <path d="M0 0 L1200 100 L1200 100 L0 100 Z" fill="none" />
        <line x1="0" y1="0" x2="1200" y2="100" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
