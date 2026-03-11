import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

const SidebarBrand = ({ onClose }) => {
  return (
    <div>
      <div className="flex min-h-[68px] items-center justify-between gap-3 px-3">
        <div className="flex min-h-10 items-center gap-1.5">
          <span aria-hidden="true" className="size-4 shrink-0" />
          <p className="text-[1.625rem] leading-none font-semibold tracking-tight text-slate-900">
            Authrol
          </p>
        </div>

        {onClose ? (
          <Button
            aria-label="Close sidebar"
            className="md:hidden"
            size="icon-sm"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <X />
          </Button>
        ) : null}
      </div>

      <div className="-mx-4 h-px bg-slate-200/80 shadow-[0_3px_10px_rgba(15,23,42,0.06)]" />
    </div>
  );
};

export default SidebarBrand;
