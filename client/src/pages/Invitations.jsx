import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CreateInvitation from "@/components/dashboard/CreateInvitation";
import InvitationDetails from "@/components/dashboard/InvitationDetails";

const Invitations = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography variant="h4">Invitations</Typography>
          <Typography variant="body2" color="text.secondary">
            Invite teammates and manage workspace onboarding.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setIsOpen((prev) => !prev)}
          startIcon={isOpen ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
        >
          {isOpen ? "Hide Invite Form" : "Create Invitation"}
        </Button>
      </Box>

      <CreateInvitation isOpen={isOpen} />
      <InvitationDetails />
    </Stack>
  );
};

export default Invitations;
