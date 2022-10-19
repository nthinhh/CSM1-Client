import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

export default function ManagementTable({
  rows,
  setRows,
  currentRow,
  setCurrentRow,
  columns,
  nameOfId = "id",
  onSaveRow,
  onDeleteRow,
  children,
  className = "",
}) {
  const [isAdding, setIsAdding] = useState(true);
  const [selections, setSelections] = useState([]);

  const getModel = () => {
    let model = {};
    let newColumns = columns({});
    for (let i in newColumns) if(newColumns[i]?.field && newColumns[i].field !== "toolbar") model[newColumns[i].field] = "";
    model[nameOfId] = "Untitled";
    return model;
  };

  const convertCurrentRow = () => {
    let row = {};
    for (let i in currentRow) {
      for (let j in getModel()) {
        if (currentRow[i][j] !== undefined) row[j] = currentRow[i][j].value;
      }
    }
    return row;
  };

  const convertRow = (row, isOpen) => {
    let newRow = {};
    newRow[row[nameOfId]] = {};
    for (let i in row) {
      newRow[row[nameOfId]][i] = {};
      newRow[row[nameOfId]][i].value = row[i];
    }
    if (isOpen) newRow[row[nameOfId]].toolbar = { value: undefined };
    return newRow;
  };

  const addRow = async () => {
    let newRows = [...rows];
    newRows.unshift(getModel());
    setCurrentRow(convertRow(getModel(), true));
    setRows(newRows);
    setIsAdding(true);
  };

  const deleteRow = async (row) => {
    let newRows = [...rows];
    let index = newRows.findIndex((r) => r[nameOfId] === row[nameOfId]);

    let { ok } = await onDeleteRow(row, index);
    if (ok) {
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const deleteRows = async () => {
    let newRows = [...rows];

    let ok = false;
    for (let selection of selections) {
      let index = newRows.findIndex((row) => row[nameOfId] === selection);
      ok = await onDeleteRow(newRows[index], index);
    }
    if (ok) {
      newRows = newRows.filter((row) => selections.indexOf(row[nameOfId]) < 0);
      setRows(newRows);
    }
  };

  const closeRow = () => {
    if (isAdding) {
      let newRows = [...rows];
      newRows.shift();
      setRows(newRows);
    }
    setIsAdding(false);
    setCurrentRow({});
  };

  const saveRow = async (row) => {
    let newRows = [...rows];
    let index = newRows.findIndex((r) => r[nameOfId] === row[nameOfId]);

    let { ok, data } = await onSaveRow(
      { ...row, ...convertCurrentRow() },
      isAdding
    );

    newRows[index] = { ...row, ...convertCurrentRow() };
    
    if (isAdding)
    {
      newRows[index][nameOfId] = data[nameOfId];
      newRows.push(newRows[index]);
      newRows.shift();
    }

    if (ok) {
      setRows([...newRows]);
      setCurrentRow({});
    }
  };

  const editRow = (row) => {
    setCurrentRow(convertRow(row, true));
    setIsAdding(false);
  };

  return (
    <div className={className}>
      <DataGrid
        getRowId={(row) => row[nameOfId]}
        rows={rows}
        editRowsModel={currentRow}
        columns={columns({
          onSave: saveRow,
          onClose: closeRow,
          onDelete: deleteRow,
          onEdit: editRow,
          rows: rows
        })}
        pageSize={10}
        rowsPerPageOptions={[5]}
        editMode="row"
        checkboxSelection
        disableSelectionOnClick
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: () => (
            <div>
              {React.cloneElement(children, {
                onAdd: addRow,
                onDeleteAll: deleteRows,
              })}
            </div>
          ),
        }}
        onEditRowsModelChange={(model) => {
          setCurrentRow(model);
        }}
        onSelectionModelChange={(newSelection) => {
          setSelections(newSelection);
        }}
      />
    </div>
  );
}
