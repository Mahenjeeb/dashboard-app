import React from "react";
import "@/components/dashboard/invitationform.css";
import { Send } from "lucide-react";

const CreateInvitation = ({ isOpen }) => {
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
                className="input validator w-full"
                placeholder="text@gmail.com"
                required
              />
            </fieldset>
            <fieldset className="fieldset w-full md:max-w-xs">
              <legend className="fieldset-legend">Select a role</legend>
              <select defaultValue="" className="select w-full" required>
                <option value="" disabled>
                  Role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </fieldset>
            <button type="submit" className="btn mb-1 md:self-end">
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
