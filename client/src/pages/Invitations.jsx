import CommonButton from "@/components/common/CommonButton";
import EmailRoleForm from "@/components/common/EmailRoleForm";
import ResponsiveTable from "@/components/table/ResponsiveTable";
import { Send } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useState } from "react";
import { queryClient } from "@/util/queryClient";
import { notifySuccess } from "@/util/notifications";

const columns = [
  {
    key: "email",
    label: "Email",
  },
  {
    key: "roleForUser",
    label: "Role",
  },
  {
    key: "accepted",
    label: "Status",
  },
  {
    key: "expireAt",
    label: "Valid Upto",
  },
  {
    key: "action",
    label: "Action"
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
      await queryClient.invalidateQueries({ queryKey: ["invited-users"] });
      notifySuccess("Invitation sent successfully.");
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

  const getInvitedUsers = async () => {
    const { data } = await api.get("app/invited-users");
    return data;
  };
  const { data: invitedUserData } = useQuery({
    queryKey: ["invited-users"],
    queryFn: getInvitedUsers,
  });
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
            <EmailRoleForm
              formData={formData}
              onChange={handleInputChange}
              roles={roles}
            />

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
        rows={invitedUserData || []}
        title="Invitations"
      />
    </section>
  );
};

export default Invitations;
