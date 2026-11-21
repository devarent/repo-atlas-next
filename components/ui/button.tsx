"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-tight",
    "transition-[transform,box-shadow,background-color,border-color,filter,color] duration-200 ease-out",
    "active:scale-[0.97] motion-reduce:active:scale-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-45",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-white bg-[linear-gradient(135deg,#8b5cf6_0%,#6366f1_44%,#22d3ee_100%)] shadow-[0_10px_30px_-14px_rgba(99,102,241,0.95),inset_0_1px_0_rgba(255,255,255,0.32)] hover:brightness-110 hover:shadow-[0_16px_40px_-14px_rgba(34,211,238,0.6),inset_0_1px_0_rgba(255,255,255,0.36)]",
        secondary:
          "border border-[var(--border-strong)] bg-[var(--hover-1)] text-foreground hover:bg-[var(--hover-2)] hover:border-[var(--border-strong)]",
        outline:
          "border border-[var(--border)] bg-transparent text-foreground hover:border-[var(--border-strong)] hover:bg-[var(--hover-1)]",
        ghost: "text-muted hover:bg-[var(--hover-1)] hover:text-foreground",
        subtle: "bg-[var(--primary-soft)] text-[var(--primary-text)] hover:bg-[var(--primary-soft-strong)]",
        danger:
          "text-white bg-[linear-gradient(135deg,#fb7185_0%,#e11d48_100%)] shadow-[0_10px_30px_-14px_rgba(225,29,72,0.85),inset_0_1px_0_rgba(255,255,255,0.28)] hover:brightness-110",
        link: "h-auto rounded-none p-0 text-[var(--primary-text)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-6 text-[15px]",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...props}
        {...(asChild ? {} : { disabled: disabled || loading })}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            <span className="opacity-80">{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
