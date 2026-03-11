const defaultItems = [
  {
    label: "Status",
    value: "Not configured",
  },
];

const PagePlaceholder = ({
  eyebrow,
  title,
  description,
  items = defaultItems,
}) => {
  return (
    <section className="mx-auto max-w-5xl space-y-4">
      <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-8">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.035)]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {item.value}
            </p>
            {item.hint ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.hint}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default PagePlaceholder;
