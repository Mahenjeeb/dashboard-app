import { useState } from "react";
import "./Signup.css";
import instance from "@/services/auth_service.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import tokenManager from "@/util/tokenManager.js";

const Signup = () => {
  const defaultFormData = { email: "", password: "" };
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignIn, setSignIn] = useState(true);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const url = isSignIn ? "/login" : "signup";
      const { data } = await instance.post(url, JSON.stringify(formData));
      toast.success(data.message);
      tokenManager.setAccessToken(data);
      navigate("/invitations", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-container">
          <h2 className="signup-header">
            {isSignIn ? "Log In" : "Create Account"}
          </h2>

          <form className="space-y-4" method="POST" onSubmit={handleFormSubmit}>
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

            <button type="submit" className="signup-button">
              {isSignIn ? "Sign in" : "Sign Up"}
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
