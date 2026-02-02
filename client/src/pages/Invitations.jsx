import CreateInvitation from "@/components/dashboard/CreateInvitation";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import InvitationDetails from "@/components/dashboard/InvitationDetails";
import "@/components/dashboard/invitationform.css";
// import { useLoaderData } from "react-router";
// import useGetdata from "@/hooks/useGetdata";

const Invitations = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = useLoaderData();
  // const { data } = useGetdata(pathname);
  // console.log(data);
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