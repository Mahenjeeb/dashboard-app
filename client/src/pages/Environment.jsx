import PagePlaceholder from "@/components/common/PagePlaceholder";

const Environment = () => {
  return (
    <PagePlaceholder
      description="Manage connected environments and review their current status."
      items={[
        {
          label: "Active environment",
          value: "None selected",
        },
        {
          label: "Visibility",
          value: "Internal",
        },
      ]}
      eyebrow="Workspace"
      title="Environment"
    />
  );
};

export default Environment;
