const AcceptInvitation = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Invitation
        </p>
        <h1 className="mt-2 text-lg font-semibold text-slate-900">
          Accept invitation
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Review the invitation details and continue when the workspace data is
          available.
        </p>
      </section>
    </main>
  );
};

export default AcceptInvitation;
