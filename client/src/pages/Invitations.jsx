import CreateInvitation from "@/components/dashboard/CreateInvitation";
import Table from "@/components/table/Table";
import { invitationColumns, invitationRows } from "@/components/table/tablePresets";

const Invitations = () => {
  return (
    <div className="h-full min-h-0">
      <Table columns={invitationColumns} rows={invitationRows} toolbar={<CreateInvitation />} />
    </div>
  );
};

export default Invitations;
