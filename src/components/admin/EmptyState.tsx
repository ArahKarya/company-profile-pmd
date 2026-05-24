import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      <Icon size={48} strokeWidth={1.25} className="text-text-muted mb-4" />
      <h3 className="font-display text-heading-lg text-text-primary mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-body-md text-text-secondary max-w-md mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
