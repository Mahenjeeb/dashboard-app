import React from 'react';
import { Link, useNavigate } from 'react-router';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="max-w-md mx-auto p-8 text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="text-3xl mt-4 font-semibold">Page Not Found</h2>
        <p className="mt-2 text-base-content/70">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="mt-6 space-x-4">
          <Link to="/" className="btn btn-primary px-6">
            Go to Home
          </Link>
          <button onClick={() => navigate(-1)} className="btn btn-ghost px-6">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;