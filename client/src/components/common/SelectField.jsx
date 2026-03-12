import { cn } from "@/lib/utils";

function SelectField({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "h-8 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400 focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export default SelectField;
