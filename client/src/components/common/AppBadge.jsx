import { cn } from "@/lib/utils";

const variantClasses = {
  dark: "border-slate-900 bg-slate-900 text-white",
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

const AppBadge = ({ className, variant = "neutral", children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 text-sm font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default AppBadge;
