"use client";

import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  label: string;
}

export default function ScrollIndicator({ label }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/90 animate-bounce">
      <span className="text-xs tracking-widest uppercase">{label}</span>
      <ChevronDown size={20} />
    </div>
  );
}
