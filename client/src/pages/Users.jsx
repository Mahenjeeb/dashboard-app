import PagePlaceholder from "@/components/common/PagePlaceholder";

const Users = () => {
  return (
    <PagePlaceholder
      description="View workspace members and manage access to internal tools."
      items={[
        {
          label: "Members",
          value: "0 active users",
        },
        {
          label: "Roles",
          value: "Not configured",
        },
      ]}
      eyebrow="Directory"
      title="Users"
    />
  );
};

export default Users;
