import TextField from "@/components/common/TextField";
import CommonButton from "@/components/common/CommonButton";
import { AUTH_SIGNIN_MODE, AUTH_SIGNUP_MODE } from "@/constants/auth-ui";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { queryClient } from "@/util/queryClient";
import { useMutation } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";

const authContent = {
  [AUTH_SIGNIN_MODE]: {
    title: "Sign in",
    subtitle: "Use your email and password to access the dashboard.",
    submitLabel: "Sign In",
    pendingLabel: "Signing in...",
    alternateText: "Don't have an account?",
    alternateAction: "Sign Up",
    alternateTo: "/signup",
    fields: [
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Password",
        autoComplete: "current-password",
      },
    ],
  },
  [AUTH_SIGNUP_MODE]: {
    title: "Create account",
    subtitle: "Set up a new account for workspace access.",
    submitLabel: "Create Account",
    pendingLabel: "Creating account...",
    alternateText: "Already have an account?",
    alternateAction: "Sign In",
    alternateTo: "/signin",
    fields: [
      {
        id: "name",
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        autoComplete: "name",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        autoComplete: "email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Create a password",
        autoComplete: "new-password",
      },
    ],
  },
};

const getTabClassName = (isActive) =>
  `flex-1 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
    isActive
      ? "bg-white text-slate-900 shadow-sm"
      : "text-slate-500 hover:text-slate-900"
  }`;

const AuthScreen = ({ mode = AUTH_SIGNIN_MODE }) => {
  const api = interceptorAPI();
  const navigate = useNavigate();
  const initialFormValue = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormValue);
  const content = authContent[mode] ?? authContent[AUTH_SIGNIN_MODE];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const baseURL =
    mode === AUTH_SIGNIN_MODE ? "/auth/login" : "/auth/signup";
  const authenticateUser = async (payload) => {
    const response = await api.post(baseURL, payload);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["authKey", mode],
    mutationFn: authenticateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authMe"] });
      setFormData(initialFormValue);
      mode === AUTH_SIGNUP_MODE ? navigate("/signin") : navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Authrol
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              {content.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{content.subtitle}</p>
          </div>

          <div className="mb-6 flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <Link
              className={getTabClassName(mode === AUTH_SIGNIN_MODE)}
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              className={getTabClassName(mode === AUTH_SIGNUP_MODE)}
              to="/signup"
            >
              Sign Up
            </Link>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {content.fields.map((field) => (
              <label key={field.id} className="block" htmlFor={field.id}>
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  {field.label}
                </span>
                <TextField
                  autoComplete={field.autoComplete}
                  className="h-11 rounded-lg bg-white"
                  disabled={isPending}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formData[field.id] ?? ""}
                  onChange={(event) => handleInputChange(event)}
                />
              </label>
            ))}

            <CommonButton
              className="mt-2 h-11 w-full rounded-lg"
              disabled={isPending}
              type="submit"
            >
              {isPending ? content.pendingLabel : content.submitLabel}
            </CommonButton>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            {content.alternateText}{" "}
            <Link className="font-medium text-slate-900" to={content.alternateTo}>
              {content.alternateAction}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthScreen;
