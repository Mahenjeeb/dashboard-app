const ResponsiveTable = ({
  title,
  description,
  columns = [],
  rows = [],
  emptyMessage = "No records available.",
}) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      {title || description ? (
        <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5">
          <div className="space-y-1">
            {title ? (
              <h2 className="text-base font-semibold tracking-tight text-slate-900">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm leading-5 text-slate-600">{description}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {rows.length === 0 ? (
        <div className="px-4 py-12 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="bg-slate-50/80">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 ${
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                            ? "text-center"
                            : "text-left"
                      }`}
                      scope="col"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id ?? index}
                    className="transition-colors hover:bg-slate-50/40"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-3 align-middle text-sm text-slate-600 ${
                          index < rows.length - 1 ? "border-b border-slate-200" : ""
                        } ${
                          column.align === "right"
                            ? "text-right"
                            : column.align === "center"
                              ? "text-center"
                              : "text-left"
                        }`}
                      >
                        {row[column.key] ?? "--"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile View */}
          <div className="grid gap-2 p-2 md:hidden">
            {rows.map((row, index) => (
              <article
                key={row.id ?? index}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="space-y-3">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={column.key}
                      className={`flex items-start justify-between gap-4 ${
                        columnIndex > 0 ? "border-t border-slate-200 pt-3" : ""
                      }`}
                    >
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500">
                        {column.label}
                      </span>
                      <div
                        className={`min-w-0 text-sm text-slate-900 ${
                          column.align === "right"
                            ? "ml-auto text-right"
                            : column.align === "center"
                              ? "text-center"
                              : "text-left"
                        }`}
                      >
                        {row[column.key] ?? "--"}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ResponsiveTable;
