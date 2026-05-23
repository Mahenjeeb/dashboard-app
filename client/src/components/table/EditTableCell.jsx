import { useState } from "react";
import EmailRoleForm from "../common/EmailRoleForm";
import { interceptorAPI } from "@/api/interceptorAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifySuccess } from "@/util/notifications";
import { useRevalidator } from "react-router";

const EditTableCell = ({ selectedRow, onClose }) => {
  const api = interceptorAPI();
  const revalidator = useRevalidator();
  const { data: roles = [] } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data } = await api.get("/app/roles");
      return data;
    },
  });

  const [formData, setFormData] = useState({
    id: selectedRow.id,
    email: selectedRow?.email || "",
    roleForUser: selectedRow?.role || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const updateUser = async (payload) => {
    const { data } = await api.post("/app/update", payload);
    return data;
  };
  const { mutate } = useMutation({
    mutationKey: ["EditUser"],
    mutationFn: updateUser,
    onSuccess: () => {
      revalidator.revalidate();
      notifySuccess("User updated successfully.");
      onClose();
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  if (!selectedRow) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
        onClick={(event) => event.stopPropagation()}
      >
        <EmailRoleForm
          formData={formData}
          onChange={handleChange}
          roles={roles}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditTableCell;
