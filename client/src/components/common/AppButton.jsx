import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary: "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 hover:text-white",
  secondary: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900",
  ghost: "border-transparent bg-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
};

const sizeClasses = {
  md: "h-10 px-4",
  sm: "h-9 px-3.5",
  icon: "h-9 w-9 px-0",
};

const AppButton = forwardRef(
  ({ className, type = "button", variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition outline-none disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

AppButton.displayName = "AppButton";

export default AppButton;
