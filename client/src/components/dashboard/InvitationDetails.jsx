import {
  Card,
  CardContent,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const invitationRows = [
  {
    email: "heyuser@gmail.com",
    status: "Pending",
    expiry: "02/02/2026",
  },
  {
    email: "ops.admin@authrol.com",
    status: "Accepted",
    expiry: "01/29/2026",
  },
  {
    email: "qa.member@authrol.com",
    status: "Expired",
    expiry: "01/18/2026",
  },
];

const statusColorMap = {
  Pending: "warning",
  Accepted: "success",
  Expired: "default",
};

const InvitationDetails = () => {
  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
        <Stack spacing={2}>
          <div>
            <Typography variant="h6">Invitation Activity</Typography>
            <Typography variant="body2" color="text.secondary">
              Track all invitation statuses and expiration dates.
            </Typography>
          </div>

          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 520 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Expiry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invitationRows.map((row) => (
                  <TableRow key={`${row.email}-${row.expiry}`} hover>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.status}
                        color={statusColorMap[row.status] || "default"}
                        variant={row.status === "Expired" ? "outlined" : "filled"}
                      />
                    </TableCell>
                    <TableCell>{row.expiry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InvitationDetails;
