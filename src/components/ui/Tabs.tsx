"use client";

import { createContext, useContext, useId } from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  baseId: string;
  variant: "line" | "segmented";
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "line" | "segmented";
  children: React.ReactNode;
  className?: string;
}

export function Tabs({
  value,
  onChange,
  variant = "line",
  children,
  className,
}: TabsProps) {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value, onChange, baseId, variant }}>
      <div className={cn("flex flex-col gap-6", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  const ctx = useTabsContext();
  return (
    <div
      role="tablist"
      className={cn(
        "flex",
        ctx.variant === "line" && "gap-1 border-b-2 border-surface-border-bold",
        ctx.variant === "segmented" &&
          "gap-0 border-2 border-ink-900 dark:border-paper-base p-0 w-fit",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  children: React.ReactNode;
}

export function Tab({ value, className, children, ...props }: TabProps) {
  const ctx = useTabsContext();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      onClick={() => ctx.onChange(value)}
      className={cn(
        "font-mono uppercase tracking-wider text-mono-sm transition-colors duration-fast",
        ctx.variant === "line" &&
          "px-4 py-3 border-b-2 -mb-0.5 " +
            (active
              ? "border-ink-900 dark:border-paper-base text-text-primary"
              : "border-transparent text-text-muted hover:text-text-primary"),
        ctx.variant === "segmented" &&
          "px-4 py-2 " +
            (active
              ? "bg-ink-900 text-paper-base dark:bg-paper-base dark:text-ink-900"
              : "bg-transparent text-text-primary hover:bg-surface-sunken"),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const ctx = useTabsContext();
  if (ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      className={className}
    >
      {children}
    </div>
  );
}

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponent must be inside <Tabs>");
  return ctx;
}
