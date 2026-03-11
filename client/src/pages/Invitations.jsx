import PagePlaceholder from "@/components/common/PagePlaceholder";

const Invitations = () => {
  return (
    <PagePlaceholder
      description="Review pending invitations and track workspace access."
      items={[
        {
          label: "Pending",
          value: "0 invitations",
        },
        {
          label: "Last update",
          value: "No recent activity",
        },
      ]}
      eyebrow="Access"
      title="Invitations"
    />
  );
};

export default Invitations;
