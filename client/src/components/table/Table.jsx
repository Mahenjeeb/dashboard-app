import { sampleUsers, userTableColumns } from "@/components/table/tablePresets";

const getHeaderCellClassName = (column) =>
  [
    "px-4 py-3 text-sm font-semibold text-slate-500",
    column.align === "right" ? "text-right" : "",
    column.headerClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

const getBodyCellClassName = (column) =>
  [
    "px-4 py-3.5 align-top text-sm text-slate-600",
    column.align === "right" ? "text-right" : "",
    column.cellClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

const defaultGetRowKey = (row, index) => row.id ?? row.email ?? row.token ?? index;

const Table = ({
  columns = userTableColumns,
  rows = sampleUsers,
  toolbar = null,
  emptyMessage = "No rows available.",
  getRowKey = defaultGetRowKey,
}) => {
  return (
    <section className="flex h-full min-h-0 flex-col gap-4">
      {toolbar}

      <div className="min-h-0 flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50">
          <table className="min-w-full table-fixed text-left">
            <colgroup>
              {columns.map((column) => (
                <col key={column.key} className={column.width} />
              ))}
            </colgroup>

            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className={getHeaderCellClassName(column)}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <div className="slim-scrollbar min-h-0 flex-1 overflow-auto">
          <table className="min-w-full table-fixed text-left">
            <colgroup>
              {columns.map((column) => (
                <col key={column.key} className={column.width} />
              ))}
            </colgroup>

            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.length ? (
                rows.map((row, index) => (
                  <tr key={getRowKey(row, index)} className="transition hover:bg-slate-50">
                    {columns.map((column) => (
                      <td key={column.key} className={getBodyCellClassName(column)}>
                        {column.render ? column.render(row, index) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
