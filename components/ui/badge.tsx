import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--primary-soft-strong)] bg-[var(--primary-soft)] text-[var(--primary-text)]",
        outline: "border-[var(--border)] bg-transparent text-muted",
        solid:
          "border-transparent bg-[linear-gradient(135deg,#8b5cf6,#6366f1_55%,#22d3ee)] text-white shadow-[0_6px_18px_-10px_rgba(99,102,241,0.9)]",
        accent:
          "border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
