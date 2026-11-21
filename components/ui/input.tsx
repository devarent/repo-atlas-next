import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] px-3.5 py-2 text-sm text-foreground outline-none transition",
        "shadow-[inset_0_1px_0_var(--glass-line)] placeholder:text-[color-mix(in_srgb,var(--muted)_75%,transparent)]",
        "hover:border-[var(--border-strong)] focus:border-[color-mix(in_srgb,var(--primary)_65%,transparent)] focus:ring-4 focus:ring-[var(--ring-soft)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
