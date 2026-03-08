import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const AppSelectField = forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-300",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));

AppSelectField.displayName = "AppSelectField";

export default AppSelectField;
