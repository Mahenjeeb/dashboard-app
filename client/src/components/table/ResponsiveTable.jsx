import { useState } from "react";
import SearchBox from "../common/SearchBox";
import TableAction from "./TableAction";
import TableFilter from "../common/TableFilter";

const ResponsiveTable = ({
  title,
  rows,
  emptyMessage,
  emptyMessase,
  columns,
  collection,
}) => {
  const [tableSearchData, setTableSearchData] = useState(rows);
  const displayRows = tableSearchData || rows || [];
  const noDataMessage = emptyMessage || emptyMessase || "No data found.";

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <div className="flex w-full items-start gap-2 sm:w-auto">
            <SearchBox {...{ title, setTableSearchData, collection }} />
            <TableFilter {...{title, collection}} />
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
            {displayRows.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-12 text-center text-sm text-slate-500"
                  colSpan={columns.length}
                >
                  {noDataMessage}
                </td>
              </tr>
            ) : (
              displayRows.map((row) => (
                <tr
                  className="transition-colors hover:bg-slate-50/40"
                  key={row.id || row._id}
                >
                  {columns.map((column) => (
                    <td
                      className="border-b border-slate-200 px-4 py-3 align-middle text-left text-sm text-slate-600"
                      key={column.key}
                    >
                      {column.key === "action" ? (
                        <TableAction details={{ row }} />
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="grid gap-2 p-2 md:hidden">
        <div className="px-4 py-12 text-center text-sm text-slate-500">
          {displayRows.length === 0 ? noDataMessage : null}
        </div>
      </div>
    </section>
  );
};

export default ResponsiveTable;
