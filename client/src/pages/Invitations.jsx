import CommonButton from "@/components/common/CommonButton";
import SelectField from "@/components/common/SelectField";
import TextField from "@/components/common/TextField";
import ResponsiveTable from "@/components/table/ResponsiveTable";
import { Send } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useState } from "react";

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
  const api = interceptorAPI();
  const formInputIntitialValue = {
    email: "",
    roleForUser: "",
  };
  const [formData, setFormData] = useState(formInputIntitialValue);
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await api.get("/app/roles");
      return data;
    },
  });
  const createInvitation = async (payload) => {
    const { data } = await api.post("/app/create-invitation", payload);
    return data;
  };
  const { mutate } = useMutation({
    mutationKey: ["invitation"],
    mutationFn: createInvitation,
    onSuccess: async () => {
      setFormData(formInputIntitialValue);
    },
  });
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const submitInvitation = async (event) => {
    event.preventDefault();
    mutate(formData);
  };
  return (
    <section className="mx-auto max-w-5xl space-y-4">
      <form method="post" onSubmit={submitInvitation}>
        <section className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="border-b border-slate-200 px-4 py-3.5 sm:px-5">
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Invite user
            </h2>
          </div>

          <div className="space-y-5 px-4 py-4 sm:px-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  Email address
                </span>
                <TextField
                  className="h-10 bg-white"
                  placeholder="name@company.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(event) => handleInputChange(event)}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Role</span>
                <SelectField
                  className="h-10"
                  name="roleForUser"
                  value={formData.roleForUser}
                  onChange={(event) => handleInputChange(event)}
                >
                  <option value="" key="select">
                    -- Select a Role --
                  </option>
                  {roles.map((role) => (
                    <option value={role.role} key={role._id}>
                      {role.role.toUpperCase()}
                    </option>
                  ))}
                </SelectField>
              </label>
            </div>

            <div className="flex justify-end">
              <CommonButton className="h-10 px-4" type="submit">
                <Send className="size-4" />
                Invite
              </CommonButton>
            </div>
          </div>
        </section>
      </form>

      <ResponsiveTable
        columns={columns}
        emptyMessage="No invitations sent yet."
        rows={[]}
        title="Invitations"
      />
    </section>
  );
};

export default Invitations;
