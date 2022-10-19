import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";

function HeaderTable({ onAdd, onDeleteAll }) {
  return (
    <div className="py-2 d-flex">
      <Button className="d-flex align-items-center" onClick={onAdd}>
        <div className="d-flex align-items-center">
          <AddOutlinedIcon />
          <span className="ml-2 pt-1">Add New Record</span>
        </div>
      </Button>
    </div>
  );
}

export default HeaderTable;
