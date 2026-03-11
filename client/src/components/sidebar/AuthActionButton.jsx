import { Button } from "@/components/ui/button";
import ProfileDrawer from "@/components/sidebar/ProfileDrawer";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";

const AuthActionButton = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  if (user) {
    return <ProfileDrawer user={user} />;
  }

  return (
    <Button
      className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium whitespace-nowrap text-slate-700 shadow-none hover:bg-slate-50 hover:text-slate-900 sm:px-4"
      size="sm"
      type="button"
      variant="outline"
      onClick={() => navigate("/signin")}
    >
      Sign in
    </Button>
  );
};

export default AuthActionButton;
