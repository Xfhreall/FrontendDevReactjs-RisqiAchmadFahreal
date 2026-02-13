import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  isOpen: boolean;
  className?: string;
}

export function StatusBadge({ isOpen, className }: StatusBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isOpen ? "bg-green-500" : "bg-red-500"
        )}
      />
      <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
        {isOpen ? "OPEN NOW" : "CLOSED"}
      </span>
    </div>
  );
}
