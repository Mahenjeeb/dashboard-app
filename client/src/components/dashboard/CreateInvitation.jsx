import React, { useState } from "react";
import "@/components/dashboard/invitationform.css";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";

const CreateInvitation = ({ isOpen }) => {
  const [invitation, setInvitation] = useState({
    email: "",
    roleForUser: "",
  });
  const instance = interceptorAPI();
  const mutation = useMutation({
    mutationFn: async () => await instance.post("app/create-invitation", invitation),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvitation((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {isOpen && (
        <div className="mb-10">
          <h3 className="text-2xl mb-5 text-zinc-700">Invite a user</h3>
          <form method="post" className="flex gap-4">
            <fieldset className="fieldset w-full md:max-w-sm">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                name="email"
                value={invitation.email}
                onChange={handleInputChange}
                className="input validator w-full"
                placeholder="text@gmail.com"
                required
              />
            </fieldset>
            <fieldset className="fieldset w-full md:max-w-xs">
              <legend className="fieldset-legend">Select a role</legend>
              <select
                name="roleForUser"
                value={invitation.roleForUser}
                onChange={handleInputChange}
                className="select w-full"
                required
              >
                <option value="" disabled>
                  -- Select Role --
                </option>
                <option value="SUPER_ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </fieldset>
            <button
              type="submit"
              className="btn mb-1 md:self-end"
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate(invitation);
              }}
            >
              <Send size={16} />
              Invite
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateInvitation;
