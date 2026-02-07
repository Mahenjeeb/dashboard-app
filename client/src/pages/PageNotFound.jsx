import React from "react";
import { Link, useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base-200">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Looks like this route doesn't exist
          </div>
          <h1 className="mt-8 text-7xl font-black tracking-tight text-primary">
            404
          </h1>
          <h2 className="mt-3 text-3xl font-semibold">Page Not Found</h2>
          <p className="mx-auto mt-4 max-w-xl text-base-content/70">
            The page you requested isn’t available. It may have been moved or
            the link is outdated.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-primary px-8">
              Go to Home
            </Link>
            <button onClick={() => navigate(-1)} className="btn btn-ghost px-8">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
