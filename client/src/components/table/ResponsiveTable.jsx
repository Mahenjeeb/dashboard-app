import SearchBox from "../common/SearchBox";
import TableAction from "./TableAction";
import { SlidersHorizontal } from "lucide-react";

const ResponsiveTable = ({ title, rows, emptyMessase, columns }) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          <div className="flex w-full items-start gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-64 sm:flex-none">
              <SearchBox title={title} />
            </div>
            <button
              aria-label={`Filter ${title}`}
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-700 transition-colors hover:border-slate-400 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-200"
              type="button"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full">
          <thead className="bg-slate-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
                  scope="col"
                  key={column.key}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr className="transition-colors hover:bg-slate-50/40" key={row._id}>
                {columns.map((column) => (
                  <td className="border-b border-slate-200 px-4 py-3 align-middle text-left text-sm text-slate-600" key={column.key}>
                    {column.key === 'action' ? <TableAction details = {{row}}/> : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-2 p-2 md:hidden">
        <div className="px-4 py-12 text-center text-sm text-slate-500">
          {emptyMessase}
        </div>
      </div>
    </section>
  );
};

export default ResponsiveTable;
