import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const AcceptInvitations = () => {
  const [searchParams] = useSearchParams();
  const itoken = searchParams.get("itoken");
  const instance = interceptorAPI();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: async () => {
      if (!itoken) throw new Error("Invalid invitation token");
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await instance.post(`app/accept?itoken=${itoken}`, {
        password,
      });
      return response.data;
    },
    onError: (err) => {
      setLocalError(err.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    mutate();
  };
  if (!itoken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>Invalid invitation link.</span>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-success shadow-lg">
          <span>Password set successfully! You can now login.</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Set Your Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {(localError || error) && (
              <div className="alert alert-error text-sm">
                <span>{localError || error?.message}</span>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Set Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitations;
