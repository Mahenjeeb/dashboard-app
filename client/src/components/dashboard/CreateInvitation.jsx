import AppButton from "@/components/common/AppButton";
import AppSelectField from "@/components/common/AppSelectField";
import AppTextField from "@/components/common/AppTextField";

const CreateInvitation = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
        <AppTextField type="email" placeholder="Enter email" />

        <AppSelectField defaultValue="ADMIN">
          <option value="ADMIN">ADMIN</option>
          <option value="EDITOR">EDITOR</option>
          <option value="VIEWER">VIEWER</option>
        </AppSelectField>

        <AppButton className="md:self-stretch">Invite User</AppButton>
      </div>
    </div>
  );
};

export default CreateInvitation;
