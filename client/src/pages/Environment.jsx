import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useUser } from "@/context/UserContext";
import AuthLockOverlay from "@/components/dashboard/AuthLockOverlay";
import AppButton from "@/components/common/AppButton";
import AppTextField from "@/components/common/AppTextField";

const variableRows = [
  { key: "JWT_SECRET", value: "**************", scope: "Production" },
  { key: "DB_URI", value: "mongodb+srv://...", scope: "Production" },
  { key: "MAIL_API_KEY", value: "**************", scope: "Staging" },
];

const Environment = () => {
  const { isAuthenticated } = useUser();

  return (
    <Stack spacing={3}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: "relative" }}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Add New Variable</Typography>
                  <AppTextField
                    label="Key"
                    placeholder="API_BASE_URL"
                    fullWidth
                    disabled={!isAuthenticated}
                  />
                  <AppTextField
                    label="Value"
                    placeholder="https://api.your-app.com"
                    fullWidth
                    disabled={!isAuthenticated}
                  />
                  <AppTextField
                    label="Environment"
                    placeholder="Production"
                    fullWidth
                    disabled={!isAuthenticated}
                  />
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                  >
                    <Switch defaultChecked disabled={!isAuthenticated} />
                    <Typography variant="body2" color="text.secondary">
                      Mark as encrypted value
                    </Typography>
                  </Stack>
                  <AppButton
                    startIcon={<SaveRoundedIcon />}
                    disabled={!isAuthenticated}
                  >
                    Save Variable
                  </AppButton>
                </Stack>
              </CardContent>
            </Card>
            {!isAuthenticated && (
              <AuthLockOverlay
                title="Environment editing is locked"
                description="You can view data, but editing requires sign in."
                ctaTo="?auth=signin"
              />
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
              <Stack spacing={2}>
                <Typography variant="h6">Existing Variables</Typography>
                <Divider />
                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table size="small" sx={{ minWidth: 520 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Scope</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {variableRows.map((item) => (
                        <TableRow key={item.key} hover>
                          <TableCell>{item.key}</TableCell>
                          <TableCell>{item.value}</TableCell>
                          <TableCell>{item.scope}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Environment;
