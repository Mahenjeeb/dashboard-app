import { PenBox, Trash2, X } from "lucide-react";
import { useReducer } from "react";
import EditTableCell from "./EditTableCell";
import { useMutation } from "@tanstack/react-query";
import { interceptorAPI } from "@/api/interceptorAPI";
import { notifySuccess } from "@/util/notifications";
import { useRevalidator } from "react-router";
const TableAction = ({ details }) => {
  const api = interceptorAPI();
  const revalidator = useRevalidator();
  const tableCellIntialState = {
    isEdit: false,
    rowData: null,
    isDelete: false,
  };
  function tableCellReducer(state, action) {
    switch (action.type) {
      case "ROW DETAILS":
        return { ...state, rowData: action.payload };
      case "IS EDIT":
        return { ...state, isEdit: action.payload };
      default:
        return state;
    }
  }
  const [tableCellState, tableCellDispatch] = useReducer(
    tableCellReducer,
    tableCellIntialState,
  );

  const handleEdit = (row) => {
    tableCellDispatch({ type: "ROW DETAILS", payload: row });
    tableCellDispatch({ type: "IS EDIT", payload: true });
  };
  const deleteTableCell = async (payload) => {
    const { data } = await api.post("/app/delete", payload);
    return data;
  };
  const { mutate } = useMutation({
    mutationKey: ["TABLE_CELL_DELETE"],
    mutationFn: deleteTableCell,
    onSuccess: () => {
      revalidator.revalidate();
      notifySuccess("User deleted successfully.");
    },
  });
  const handleDelete = (id) => mutate({ id });
  return (
    <>
      <div className="flex gap-3 align-middle items-center">
        <PenBox
          size={18}
          className="hover:text-blue-500"
          onClick={() => {
            handleEdit(details.row);
          }}
        />
        <Trash2
          size={18}
          className="hover:text-red-500"
          onClick={() => handleDelete(details.row.id)}
        />
        {tableCellState.isEdit && (
          <EditTableCell
            key={tableCellState.rowData.id}
            selectedRow={tableCellState.rowData}
            onClose={() =>
              tableCellDispatch({ type: "IS EDIT", payload: false })
            }
          />
        )}
      </div>
    </>
  );
};
export default TableAction;
