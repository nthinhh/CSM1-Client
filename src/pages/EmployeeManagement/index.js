import React, { useState, useEffect } from "react";
import EmployeeModel from "helpers/TableModels/EmployeeModel";
import { Layout, HeaderTable, ManagementTable } from "components";
import { EMPLOYEE_MANAGEMENT_TITLE } from "constants";
import "./EmployeeManagement.css";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const employeeModel = new EmployeeModel();

  const addEmployee = async (row) => {
    console.log("ADDDDD");
    return { ok: true };
  };

  const saveEmployee = async (row, isAdding) => {
    if (isAdding) {
      let returnData = {};

      // ADD NEW EMPLOYEE --> OK
      async function postData(url = "", data = {}) {
        let response;
        try {
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.log("Error: " + error.message);
        }

        console.log("data: ", data);

        return response.json();
      }

      postData("/api/employee", row).then((data) => {
        console.log(data);
        returnData = data;
      });

      return {
        ok: true,
        data: returnData.employee,
      };
    } else {
      // UPDATE EMPLOYEE
      async function putData(url = "", data = {}) {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response.json();
      }

      putData(`/api/employee/${row.employeeId}`, row).then((data) => {
        console.log(data);
      });

      return {
        ok: true,
      };
    }
  };

  const deleteEmployee = async (row, index) => {
    // DELETE NEW EMPLOYEE
    async function deleteData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    }

    deleteData(`/api/employee/${row.employeeId}`, row).then((data) => {
      console.log(data);
    });

    return { ok: true, data: {} };
  };

  useEffect(() => {
    fetch("/api/employee")
      .then((response) => response.json())
      .then((datas) => setEmployees(datas?.employees || []))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout title={EMPLOYEE_MANAGEMENT_TITLE}>
      <div className="employee-management">
        <ManagementTable
          className="employee-management_table"
          nameOfId="employeeId"
          rows={employees}
          setRows={setEmployees}
          currentRow={currentEmployee}
          setCurrentRow={setCurrentEmployee}
          columns={employeeModel.getColumns}
          onSaveRow={saveEmployee}
          onDeleteRow={deleteEmployee}
        >
          <HeaderTable />
        </ManagementTable>
      </div>
    </Layout>
  );
}

export default EmployeeManagement;
