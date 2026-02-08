import CreateInvitation from "@/components/dashboard/CreateInvitation";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import InvitationDetails from "@/components/dashboard/InvitationDetails";
import "@/components/dashboard/invitationform.css";

const Invitations = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <button className="btn" onClick={() => setIsOpen(!isOpen)}>
          <Plus /> Create Invitation
        </button>
      </div>
      <CreateInvitation isOpen={isOpen} />
      <InvitationDetails />
    </>
  );
};

export default Invitations;
