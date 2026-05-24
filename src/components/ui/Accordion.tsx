"use client";

import { useState, useId, createContext, useContext } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionContextValue {
  openIds: Set<string>;
  toggle: (id: string) => void;
  variant: "default" | "bordered";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProps {
  type?: "single" | "multiple";
  defaultOpen?: string[];
  variant?: "default" | "bordered";
  children: React.ReactNode;
  className?: string;
}

export function Accordion({
  type = "single",
  defaultOpen = [],
  variant = "default",
  children,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openIds, toggle, variant }}>
      <div
        className={cn(
          "flex flex-col",
          variant === "bordered" && "border-2 border-surface-border-bold divide-y-2 divide-surface-border-bold",
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export function AccordionItem({ id: providedId, title, children }: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be inside <Accordion>");
  const autoId = useId();
  const id = providedId ?? autoId;
  const open = ctx.openIds.has(id);
  return (
    <div className={cn(ctx.variant === "default" && "border-b border-surface-border")}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-content`}
          onClick={() => ctx.toggle(id)}
          className="flex items-center justify-between gap-4 w-full px-4 py-4 text-left text-heading-md text-text-primary hover:bg-surface-sunken transition-colors duration-fast"
        >
          <span>{title}</span>
          {open ? (
            <Minus size={20} strokeWidth={2} />
          ) : (
            <Plus size={20} strokeWidth={2} />
          )}
        </button>
      </h3>
      {open && (
        <div id={`${id}-content`} className="px-4 pb-4 text-body-md text-text-secondary">
          {children}
        </div>
      )}
    </div>
  );
}
