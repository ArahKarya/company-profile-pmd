import { cn } from "@/lib/cn";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  { number: "01", title: "Pre-cleaning", description: "Pembersihan awal dari kotoran dan benda asing" },
  { number: "02", title: "Drying", description: "Pengeringan untuk mencapai kadar air optimal" },
  { number: "03", title: "Husking", description: "Pengupasan sekam padi" },
  { number: "04", title: "Whitening", description: "Pemutihan dan pemolesan beras" },
  { number: "05", title: "Grading", description: "Pemisahan berdasarkan kualitas dan ukuran" },
  { number: "06", title: "Packing", description: "Pengemasan steril dengan standar food grade" },
];

interface ProcessTimelineProps {
  steps?: ProcessStep[];
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function ProcessTimeline({
  steps = DEFAULT_STEPS,
  variant = "horizontal",
  className,
}: ProcessTimelineProps) {
  if (variant === "vertical") {
    return (
      <ol className={cn("flex flex-col gap-0", className)}>
        {steps.map((step, idx) => (
          <li key={step.number} className="relative flex gap-6 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-md font-semibold border-2 border-ink-900 dark:border-paper-base">
                {step.number}
              </div>
              {idx < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-ink-900 dark:bg-paper-base mt-2" />
              )}
            </div>
            <div className="pt-2 pb-6 flex-1">
              <h3 className="font-display text-heading-lg text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-body-md text-text-secondary">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className={cn("overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0", className)}>
      <ol className="flex gap-0 min-w-max md:min-w-0 md:grid md:grid-cols-6">
        {steps.map((step, idx) => (
          <li
            key={step.number}
            className={cn(
              "relative flex-1 px-4 py-6 border-l-2 border-surface-border-bold min-w-[200px]",
              idx === steps.length - 1 && "border-r-2"
            )}
          >
            <div className="font-mono text-mono-lg text-pmd-gold-700 dark:text-pmd-gold-400 mb-3 font-semibold text-2xl">
              {step.number}
            </div>
            <h3 className="font-display text-heading-md text-text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-body-sm text-text-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
