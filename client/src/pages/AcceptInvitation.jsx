import { useState } from "react";
import TextField from "@/components/common/TextField";
import CommonButton from "@/components/common/CommonButton";
import { useMutation } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useNavigate, useSearchParams } from "react-router";
import { getErrorMessage, notifyError, notifySuccess } from "@/util/notifications";

const initialFormData = {
  name: "",
  password: "",
  confirmPassword: "",
};

const AcceptInvitation = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isInvitationAccepted, setIsInvitationAccepted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const api = interceptorAPI();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("itoken");
  const hasName = formData.name.trim().length > 0;
  const passwordsMatch =
    formData.password.length > 0 && formData.password === formData.confirmPassword;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubmissionError("");
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const createInvitedUser = async (payload) => {
    const { data } = await api.post(`/app/accept?itoken=${invitationToken}`, payload);
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["accept invitation"],
    mutationFn: createInvitedUser,
    onSuccess: () => {
      setIsInvitationAccepted(true);
      setSubmissionError("");
      setFormData(initialFormData);
      notifySuccess("Invitation accepted successfully.");
    },
    onError: (error) => {
      const message = getErrorMessage(
        error,
        "We couldn't finish setting up your account.",
      );
      setSubmissionError(message);
      notifyError(error, "We couldn't finish setting up your account.");
    },
    meta: {
      skipErrorToast: true,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasName || !passwordsMatch || !invitationToken) {
      return;
    }
    mutate(formData);
  };

  if (isInvitationAccepted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Authrol
          </p>
          <h1 className="mt-3 text-xl font-semibold text-slate-900">
            Invitation accepted
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Your account is ready. Please sign in to access your dashboard.
          </p>
          <div className="mt-6">
            <CommonButton
              className="h-10 rounded-md w-full"
              type="button"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </CommonButton>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          Authrol
        </p>
        <h1 className="mt-3 mb-6 text-xl font-semibold text-slate-900">
          Set password
        </h1>
        {!invitationToken ? (
          <p className="mb-6 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            Invitation link is missing or invalid.
          </p>
        ) : null}
        {submissionError ? (
          <p className="mb-6 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {submissionError}
          </p>
        ) : null}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block" htmlFor="name">
            <span className="mb-2 block text-sm text-slate-700">Full name</span>
            <TextField
              autoComplete="name"
              className="h-10 rounded-md border-slate-300"
              disabled={isPending || !invitationToken}
              id="name"
              name="name"
              placeholder="Enter full name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="block" htmlFor="password">
            <span className="mb-2 block text-sm text-slate-700">Password</span>
            <TextField
              autoComplete="new-password"
              className="h-10 rounded-md border-slate-300"
              disabled={isPending || !invitationToken}
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className="block" htmlFor="confirmPassword">
            <span className="mb-2 block text-sm text-slate-700">
              Confirm password
            </span>
            <TextField
              autoComplete="new-password"
              className="h-10 rounded-md border-slate-300"
              disabled={isPending || !invitationToken}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
          {formData.confirmPassword && !passwordsMatch ? (
            <p className="text-sm text-rose-600">Passwords do not match.</p>
          ) : null}
          <CommonButton
            className="h-10 w-full rounded-md"
            disabled={!hasName || !passwordsMatch || isPending || !invitationToken}
            type="submit"
          >
            {isPending ? "Submitting..." : "Submit"}
          </CommonButton>
        </form>
      </section>
    </main>
  );
};

export default AcceptInvitation;
