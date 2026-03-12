import ResponsiveTable from "@/components/table/ResponsiveTable";
import CommonButton from "@/components/common/CommonButton";
import SelectField from "@/components/common/SelectField";
import TextField from "@/components/common/TextField";
import { Mail, Send } from "lucide-react";


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
    key: "sentOn",
    label: "Sent on",
  },
  {
    key: "action",
    label: "Action",
    align: "right",
  },
];

const Invitations = () => {
  return (
    <section className="mx-auto max-w-5xl space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            Invite user
          </h2>
        </div>

        <div className="grid gap-4 px-4 py-4 sm:px-5 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
          <label className="block">
            <TextField
              className="h-10 bg-white"
              placeholder="name@company.com"
              type="email"
            />
          </label>

          <label className="block">
            <SelectField className="h-10" defaultValue="User">
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </SelectField>
          </label>

          <CommonButton className="h-10 px-4" type="button">
            <Send className="size-4" />
            Invite
          </CommonButton>
        </div>
      </section>

      <ResponsiveTable
        columns={columns}
        rows={[]}
        title="Invitations"
      />
    </section>
  );
};

export default Invitations;
