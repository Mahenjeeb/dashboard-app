import { Navigate, useSearchParams } from "react-router";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  return <Navigate to={`/users?auth=${mode}`} replace />;
};

export default Signup;
