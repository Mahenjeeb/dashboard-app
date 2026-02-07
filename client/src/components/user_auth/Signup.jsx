import { useState } from "react";
import "./Signup.css";
import toast from "react-hot-toast";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Signup = () => {
  const defaultFormData = { email: "", password: "" };
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignIn, setSignIn] = useState(true);
  const url = isSignIn ? "login" : "signup";
  const apiInstance = interceptorAPI();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { mutate, isPending } = useMutation({
    mutationKey: ["userAuth", url],
    mutationFn: async (payload) => {
      const response = await apiInstance.post(`/auth/${url}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(["authMe"]);
      navigate("/", { replace: true });
    },
    onError: (err) =>
      toast.error(
        err.response?.data?.message || "Failed to login, Try again later",
      ),
  });
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <h2 className="signup-header">
            {isSignIn ? "Log In" : "Create Account"}
          </h2>

          <form className="space-y-4" method="POST">
            <div>
              <label className="signup-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Enter Email"
                className="signup-input"
              />
            </div>

            <div>
              <label className="signup-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Enter Password"
                className="signup-input"
              />
            </div>
            <button
              type="submit"
              className="signup-button"
              onClick={(event) => {
                event.preventDefault();
                if (!isPending) mutate(formData);
              }}
              disabled={isPending}
            >
              {isPending ? "Loading..." : isSignIn ? "Sign in" : "Sign Up"}
            </button>
          </form>
          <div className="signup-footer">
            <p>
              {isSignIn ? "New user? " : "Already have an account? "}
              <span
                onClick={() => {
                  setSignIn(!isSignIn);
                  setFormData(defaultFormData);
                }}
              >
                {isSignIn ? "Register Now" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
