import { useState } from "react";
import { Check, Funnel, X } from "lucide-react";
import { interceptorAPI } from "@/api/interceptorAPI";

// const statusOptions = ["Active", "Inactive"];
const triggerBase =
  "flex size-10 items-center justify-center rounded-lg border text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200";
const triggerState = {
  closed: "border-slate-300 bg-slate-100 hover:border-slate-400 hover:bg-white",
  open: "border-slate-500 bg-white text-slate-950",
};
// const optionBase =
//   "flex w-full items-center outline-none gap-3 rounded-md px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-200";
const checkboxBase =
  "flex size-4 items-center justify-center rounded border transition-colors";
const actionBase =
  "rounded-md px-4 py-2 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200";

const TableFilter = ({ title, collection, setTableData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resp, setResp] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const api = interceptorAPI();
  const getFilters = async () => {
    const { data } = await api.get("/app/filter", {
      params: { collection },
    });
    setResp(data);
  };
  const handleFilterClick = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      getFilters();
    }
  };
  const handleSelection = (checked, value, category) => {
    setSelectedFilters((current) => {
      // null checking for selected filter. defalut value []
      const currentValues = current[category] ?? [];
      // check = true then nextValues will have data else []
      const nextValues = checked
        ? [...new Set([...currentValues, value])]
        : currentValues.filter((item) => item !== value);
      // removing empty category from selected filters. e.g {role : ['admin', 'super admin'], status : []}
      if (nextValues.length === 0) {
        const nextFilters = { ...current };
        delete nextFilters[category];
        return nextFilters;
      }
      // returing selected filter
      return { ...current, [category]: nextValues };
    });
  };
  const buildFilterCondition = (selectedFilters) => ({
    filters: Object.entries(selectedFilters).map(([field, values]) => ({
      field,
      operator: "in",
      values,
    })),
  });

  const applyFilter = async () => {
    const filterStructredCondition = {
      ...buildFilterCondition(selectedFilters),
    };
    const { data } = await api.post(
      `app/apply-filter`,
      filterStructredCondition,
      {
        params: {
          collection,
        },
      },
    );
    setTableData(
      data.map((row) => ({
        ...row,
        lastActive: row.updatedAt || row.expireAt,
      })),
    );
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedFilters({});
  };

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-label={`Filter ${title}`}
        className={`${triggerBase} ${isOpen ? triggerState.open : triggerState.closed}`}
        onClick={handleFilterClick}
        type="button"
      >
        <Funnel className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-900/10">
          <div className="flex items-center justify-between px-3 py-2.5">
            <div>
              <h3 className="text-sm font-medium text-slate-950">Filter</h3>
              <p className="text-xs text-slate-500">{title}</p>
            </div>
            <button
              aria-label="Close filter menu"
              className="flex size-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto px-3 pb-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
            <section className="border-t border-slate-100 pt-2">
              {resp &&
                Object.entries(resp ?? {}).map(([category, values]) => (
                  <h3
                    className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500"
                    key={category}
                  >
                    {category.toUpperCase()}
                    <ul>
                      {values.map((value) => {
                        const id = `${category}-${String(value)}`;
                        return (
                          <li className="px-2 py-1 flex gap-3" key={value}>
                            <input
                              id={id}
                              type="checkbox"
                              value={value}
                              checked={
                                selectedFilters[category]?.includes(value) ??
                                false
                              }
                              onChange={(event) =>
                                handleSelection(
                                  event.target.checked,
                                  value,
                                  category,
                                )
                              }
                              className={`${checkboxBase}`}
                            />
                            <label
                              htmlFor={id}
                              key={value}
                              className="capitalize"
                            >
                              {value}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </h3>
                ))}
              <div className="space-y-1">{}</div>
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  className={`${actionBase} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950`}
                  type="button"
                  onClick={clearSelection}
                >
                  Clear
                </button>
                <button
                  className={`${actionBase} bg-slate-900 text-white hover:bg-slate-800`}
                  type="button"
                  onClick={() => applyFilter()}
                >
                  Apply
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
