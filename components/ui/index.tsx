"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Button ─────────────────────────────────────────────────────────────
   Arc-style: four weights, three sizes, spring press, loading state.
   ─────────────────────────────────────────────────────────────────────── */

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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

/* ── Card ───────────────────────────────────────────────────────────── */

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass card-lift rounded-2xl text-foreground", className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-bold leading-tight tracking-tight", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-muted", className)} {...props} />;
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}

/* ── Badge ──────────────────────────────────────────────────────────── */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--primary-soft-strong)] bg-[var(--primary-soft)] text-[var(--primary-text)]",
        outline: "border-[var(--border)] bg-transparent text-muted",
        solid:
          "border-transparent bg-[linear-gradient(135deg,#8b5cf6,#6366f1_55%,#22d3ee)] text-white shadow-[0_6px_18px_-10px_rgba(99,102,241,0.9)]",
        accent: "border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/* ── Input ──────────────────────────────────────────────────────────── */

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] px-3.5 py-2 text-sm text-foreground outline-none transition",
        "shadow-[inset_0_1px_0_var(--glass-line)] placeholder:text-[color-mix(in_srgb,var(--muted)_75%,transparent)]",
        "hover:border-[var(--border-strong)] focus:border-[color-mix(in_srgb,var(--primary)_65%,transparent)] focus:ring-4 focus:ring-[var(--ring-soft)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

/* ── Tabs ───────────────────────────────────────────────────────────── */

export const Tabs = TabsPrimitive.Root;
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("glass inline-flex flex-wrap gap-1 rounded-2xl p-1.5", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-muted transition-all duration-200",
      "hover:bg-[var(--hover-1)] hover:text-foreground focus-visible:outline-none",
      "data-[state=active]:bg-[linear-gradient(135deg,#8b5cf6,#6366f1_55%,#22d3ee)] data-[state=active]:text-white",
      "data-[state=active]:shadow-[0_8px_24px_-12px_rgba(99,102,241,0.9)]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-6 focus-visible:outline-none", className)} {...props} />
));
TabsContent.displayName = "TabsContent";

/* ── Dialog ─────────────────────────────────────────────────────────── */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#03040a]/70 backdrop-blur-md" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "glass-strong fixed left-1/2 top-[12%] z-50 w-[92vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-3xl p-6 focus:outline-none sm:p-7",
        "shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
      />
      <div className="relative">{children}</div>
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1.5 text-muted transition hover:bg-[var(--hover-2)] hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Tutup</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-bold tracking-tight", className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

/* ── Tooltip ────────────────────────────────────────────────────────── */

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "glass-strong z-50 max-w-xs rounded-xl px-3 py-2 text-xs text-foreground shadow-xl",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

/* ── Separator ──────────────────────────────────────────────────────── */

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SeparatorPrimitive.Root ref={ref} className={cn("shrink-0 bg-[var(--border)]", className)} {...props} />
));
Separator.displayName = "Separator";
