import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const AppTextField = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300",
      className,
    )}
    {...props}
  />
));

AppTextField.displayName = "AppTextField";

export default AppTextField;
