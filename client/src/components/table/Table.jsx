import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

const sampleUsers = [
  {
    name: "Hart Hagerty",
    email: "hart.hagerty@authrol.com",
    role: "Admin",
    location: "United States",
    lastLogin: "12/05/2025",
    status: "Active",
  },
  {
    name: "Brice Swyre",
    email: "brice.swyre@authrol.com",
    role: "User",
    location: "Canada",
    lastLogin: "02/20/2026",
    status: "Active",
  },
  {
    name: "Marjy Ferencz",
    email: "marjy.ferencz@authrol.com",
    role: "User",
    location: "Germany",
    lastLogin: "02/18/2026",
    status: "Inactive",
  },
];

const metricCards = [
  {
    title: "Total Users",
    value: "128",
    icon: GroupRoundedIcon,
  },
  {
    title: "Pending Invites",
    value: "14",
    icon: PersonAddAlt1RoundedIcon,
  },
  {
    title: "Security Score",
    value: "94%",
    icon: ShieldRoundedIcon,
  },
];

const TablePage = () => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        {metricCards.map((item) => {
          const Icon = item.icon;
          return (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 0,
                    display: "grid",
                    placeItems: "center",
                    color: "primary.main",
                    bgcolor: "rgba(37, 99, 235, 0.12)",
                  }}
                >
                  <Icon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h6">{item.value}</Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Card>
        <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
          <Stack spacing={2}>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 860 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleUsers.map((user) => (
                    <TableRow key={user.email} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={user.status}
                          color={user.status === "Active" ? "success" : "default"}
                          variant={user.status === "Active" ? "filled" : "outlined"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TablePage;
