import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OptionalDialog from "components/OptionalDialog";
import { red, green, blue } from "@mui/material/colors";

class EmployeeModel {
  getColumns({ onSave, onClose, onDelete, onEdit, rows }) {
    return [
      {
        headerName: "ID",
        width: 40,
        editable: false,
        renderCell: (params) =>
          rows.findIndex((row) => row.employeeId === params.row.employeeId) + 1,
      },
      {
        field: "employeeId",
        headerName: "Employee ID",
        width: 100,
        editable: false,
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 100,
        editable: true,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 160,
        editable: true,
      },
      {
        field: "depName",
        headerName: "Department",
        width: 100,
        editable: true,
      },
      // {
      //   field: "gender",
      //   headerName: "Gender",
      //   width: 100,
      //   editable: true,
      //   type: "singleSelect",
      //   valueOptions: ["true", "false"],
      // },
      {
        field: "ethnicity",
        headerName: "Ethnicity",
        width: 100,
        editable: true,
      },
      {
        field: "birthday",
        headerName: "Birthday",
        width: 160,
        editable: true,
        type: "date",
      },
      {
        field: "toolbar",
        headerName: "Toolbar",
        width: 100,
        renderCell: (params) => (
          <div className="d-flex">
            <ModeEditOutlineOutlinedIcon
              sx={{ color: blue[500] }}
              className="cursor-pointer"
              onClick={() => onEdit(params.row)}
            />
            <OptionalDialog
              content="Do you want to delete this employee ?"
              onAgree={() => onDelete(params.row)}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ color: red[500] }}
                className="cursor-pointer"
              />
            </OptionalDialog>
          </div>
        ),
        renderEditCell: (params) => (
          <div className="d-flex">
            <SaveOutlinedIcon
              className="cursor-pointer"
              sx={{ color: green[500] }}
              onClick={() => onSave(params.row)}
            />
            <CloseOutlinedIcon className="cursor-pointer" onClick={onClose} />
          </div>
        ),
      },
    ];
  }
}

export default EmployeeModel;
