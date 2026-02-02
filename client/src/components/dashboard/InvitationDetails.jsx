import React from "react";
import "@/components/dashboard/invitationform.css";
const InvitationDetails = () => {
  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between">
          <h3 className="text-2xl mb-5 text-zinc-700">Invitations</h3>
        </div>
        <form method="get">
          <div>
            <table className="table shadow-md rounded-none">
              <thead>
                <tr className="bg-blue-500">
                  <th>Email</th>
                  <th>Status</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>heyuser@gmail.com</td>
                  <td>pending</td>
                  <td>02/02/2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvitationDetails;
