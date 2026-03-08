import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";
import Logo from "@/components/common/Logo";
import { AUTH_SIGNIN_MODE, AUTH_SIGNUP_MODE } from "@/constants/auth-ui";
import { Link } from "react-router";

const authContent = {
  [AUTH_SIGNIN_MODE]: {
    title: "Sign In",
    subtitle: "Access your dashboard workspace.",
    submitLabel: "Sign In",
    alternateText: "Don't have an account?",
    alternateAction: "Sign Up",
    alternateTo: "/signup",
    fields: [
      { id: "email", type: "email", placeholder: "Enter your email", autoComplete: "email" },
      {
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        autoComplete: "current-password",
      },
    ],
  },
  [AUTH_SIGNUP_MODE]: {
    title: "Sign Up",
    subtitle: "Create a new account for your workspace.",
    submitLabel: "Create Account",
    alternateText: "Already have an account?",
    alternateAction: "Sign In",
    alternateTo: "/signin",
    fields: [
      { id: "name", type: "text", placeholder: "Enter your full name", autoComplete: "name" },
      { id: "email", type: "email", placeholder: "Enter your email", autoComplete: "email" },
      {
        id: "password",
        type: "password",
        placeholder: "Create a password",
        autoComplete: "new-password",
      },
    ],
  },
};

const getToggleClassName = (isActive) =>
  `rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${
    isActive ? "bg-white text-slate-900 shadow-sm" : "hover:text-slate-700"
  }`;

const AuthScreen = ({ mode = AUTH_SIGNIN_MODE }) => {
  const content = authContent[mode] ?? authContent[AUTH_SIGNIN_MODE];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-medium text-slate-500">
          <Link to="/signin" className={getToggleClassName(mode === AUTH_SIGNIN_MODE)}>
            Sign In
          </Link>

          <Link to="/signup" className={getToggleClassName(mode === AUTH_SIGNUP_MODE)}>
            Sign Up
          </Link>
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{content.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{content.subtitle}</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          {content.fields.map((field) => (
            <label key={field.id} className="block">
              <AppTextField
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className="rounded-xl px-4 py-3"
              />
            </label>
          ))}

          <AppButton type="submit" className="h-12 w-full rounded-xl">
            {content.submitLabel}
          </AppButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {content.alternateText}{" "}
          <Link to={content.alternateTo} className="font-semibold text-slate-900 hover:text-slate-700">
            {content.alternateAction}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
