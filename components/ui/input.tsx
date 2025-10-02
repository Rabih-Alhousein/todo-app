import * as React from "react";

import { cn } from "@/lib/utils";

const BaseInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
});

BaseInput.displayName = "BaseInput";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  if (type === "date") {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleOpenPicker = () => {
      const el = inputRef.current;
      if (!el || (props as any)?.disabled || (props as any)?.readOnly) return;
      el.focus();
      try {
        (el as any).showPicker?.();
      } catch (_) {
        // Fallback: focusing the input is still useful
      }
    };

    return (
      <div
        className="relative"
        onMouseDown={handleOpenPicker}
        onClick={handleOpenPicker}
      >
        <BaseInput
          ref={inputRef}
          type="date"
          data-calendar-icon="custom"
          className={cn("pr-10", className)}
          {...props}
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 9H5v9h14v-9ZM5 8h14V6H5v2Z" />
        </svg>
      </div>
    );
  }

  return <BaseInput type={type} className={className} {...props} />;
}

export { Input };
