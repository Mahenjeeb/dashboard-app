import { useState } from "react";
import { Box, Stack } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Link as RouterLink } from "react-router";
import CreateInvitation from "@/components/dashboard/CreateInvitation";
import InvitationDetails from "@/components/dashboard/InvitationDetails";
import { useUser } from "@/context/UserContext";
import AppButton from "@/components/common/AppButton";

const Invitations = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated } = useUser();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "stretch", sm: "flex-end" },
        }}
      >
        {isAuthenticated ? (
          <AppButton
            onClick={() => setIsOpen((prev) => !prev)}
            startIcon={isOpen ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minHeight: 40,
            }}
          >
            {isOpen ? "Hide Invite Form" : "Create Invitation"}
          </AppButton>
        ) : (
          <AppButton
            variant="outlined"
            component={RouterLink}
            to="?auth=signin"
            startIcon={<LockRoundedIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minHeight: 40,
            }}
          >
            Sign In To Create Invitation
          </AppButton>
        )}
      </Box>

      <CreateInvitation isOpen={isAuthenticated ? isOpen : true} />
      <InvitationDetails />
    </Stack>
  );
};

export default Invitations;
