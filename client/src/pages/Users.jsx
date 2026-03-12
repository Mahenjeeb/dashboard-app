import ResponsiveTable from "@/components/table/ResponsiveTable";
import { useLoaderData } from "react-router";
const Users = () => {
  const columns = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "lastActive",
      label: "Last active",
    },
  ];
  const loader = useLoaderData();
  const rows = loader.map((row) => ({
    id: row._id,
    email: row.email,
    role: row.role,
    status: row.isActive ? "Active" : "Inactive",
    lastActive: row.updatedAt,
  }));
  return (
    <section className="mx-auto max-w-5xl">
      <ResponsiveTable
        columns={columns}
        emptyMessage="No users found."
        rows={rows}
        title="Users"
      />
    </section>
  );
};

export default Users;
