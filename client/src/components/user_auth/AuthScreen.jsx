import TextField from "@/components/common/TextField";
import CommonButton from "@/components/common/CommonButton";
import { AUTH_SIGNIN_MODE, AUTH_SIGNUP_MODE } from "@/constants/auth-ui";
import { Link } from "react-router";

const authContent = {
  [AUTH_SIGNIN_MODE]: {
    title: "Sign In",
    subtitle: "Enter your account details to continue.",
    submitLabel: "Sign In",
    alternateText: "Don't have an account?",
    alternateAction: "Sign Up",
    alternateTo: "/signup",
    fields: [
      {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        autoComplete: "email",
      },
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
    subtitle: "Create an account to get started.",
    submitLabel: "Create Account",
    alternateText: "Already have an account?",
    alternateAction: "Sign In",
    alternateTo: "/signin",
    fields: [
      {
        id: "name",
        type: "text",
        placeholder: "Enter your full name",
        autoComplete: "name",
      },
      {
        id: "email",
        type: "email",
        placeholder: "Enter your email",
        autoComplete: "email",
      },
      {
        id: "password",
        type: "password",
        placeholder: "Create a password",
        autoComplete: "new-password",
      },
    ],
  },
};

const getTabClassName = (isActive) =>
  `flex-1 rounded-md px-3 py-2 text-center text-sm ${isActive ? "bg-slate-900 text-white" : "text-slate-600"}`;

const AuthScreen = ({ mode = AUTH_SIGNIN_MODE }) => {
  const content = authContent[mode] ?? authContent[AUTH_SIGNIN_MODE];

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex rounded-md bg-slate-100 p-1">
          <Link className={getTabClassName(mode === AUTH_SIGNIN_MODE)} to="/signin">
            Sign In
          </Link>
          <Link className={getTabClassName(mode === AUTH_SIGNUP_MODE)} to="/signup">
            Sign Up
          </Link>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">{content.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{content.subtitle}</p>
        </div>

        <form className="space-y-4 text-center" onSubmit={(event) => event.preventDefault()}>
          {content.fields.map((field) => (
            <div key={field.id}>
              <TextField
                autoComplete={field.autoComplete}
                className="h-10"
                name={field.id}
                placeholder={field.placeholder}
                type={field.type}
              />
            </div>
          ))}

          <CommonButton className="mt-2 h-10 w-full" type="submit">
            {content.submitLabel}
          </CommonButton>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          {content.alternateText}{" "}
          <Link className="text-slate-900 underline" to={content.alternateTo}>
            {content.alternateAction}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthScreen;
