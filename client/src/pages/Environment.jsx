import {
  Box,
  Button,
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
  TextField,
  Typography,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const variableRows = [
  { key: "JWT_SECRET", value: "**************", scope: "Production" },
  { key: "DB_URI", value: "mongodb+srv://...", scope: "Production" },
  { key: "MAIL_API_KEY", value: "**************", scope: "Staging" },
];

const Environment = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Environment Variables</Typography>
        <Typography variant="body2" color="text.secondary">
          Configure keys and runtime settings used by your workspace.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack spacing={2}>
                <Typography variant="h6">Add New Variable</Typography>
                <TextField label="Key" placeholder="API_BASE_URL" fullWidth />
                <TextField label="Value" placeholder="https://api.your-app.com" fullWidth />
                <TextField label="Environment" placeholder="Production" fullWidth />
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Switch defaultChecked />
                  <Typography variant="body2" color="text.secondary">
                    Mark as encrypted value
                  </Typography>
                </Stack>
                <Button variant="contained" startIcon={<SaveRoundedIcon />}>
                  Save Variable
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Stack spacing={2}>
                <Typography variant="h6">Existing Variables</Typography>
                <Divider />
                <TableContainer>
                  <Table size="small">
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
