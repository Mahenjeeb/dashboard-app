import PagePlaceholder from "@/components/common/PagePlaceholder";

const Settings = () => {
  return (
    <PagePlaceholder
      description="Set workspace defaults and keep administrative controls in one place."
      items={[
        {
          label: "Notifications",
          value: "Default",
        },
        {
          label: "Access policy",
          value: "Standard",
        },
      ]}
      eyebrow="Preferences"
      title="Settings"
    />
  );
};

export default Settings;
