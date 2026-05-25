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
      case "IS DELETE":
        return { ...state, isDelete: action.payload };
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
          onClick={() => {
            tableCellDispatch({ type: "ROW DETAILS", payload: details.row });
            tableCellDispatch({ type: "IS DELETE", payload: true });
          }}
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
        {tableCellState.isDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
              className="absolute inset-0"
              onClick={() => tableCellDispatch({ type: "IS DELETE", payload: false })}
              aria-hidden="true"
            />
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
              <h3 className="text-lg font-medium text-slate-900">Are you sure?</h3>
              <p className="mt-2 text-sm text-slate-600">This process cannot be undone.</p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => tableCellDispatch({ type: "IS DELETE", payload: false })}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                  onClick={() => {
                    mutate({ id: tableCellState.rowData.id });
                    tableCellDispatch({ type: "IS DELETE", payload: false });
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default TableAction;
