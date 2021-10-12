import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import EmployeeRecord from "./EmployeeRecord";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { getUser } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (getUser() === null) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="employee_container">
      <h1>Showing all Employees 😁</h1>

      <div className="employee__table__container">
        <table className="employee__table">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Options</th>
          </tr>
          <EmployeeRecord
            key={1}
            id={"emp__id__00XXX"}
            firstName={"Employee"}
            lastName={"1"}
            email={"employee__email__id@email.xyz"}
            department={"Backend"}
          />
          <EmployeeRecord
            key={2}
            id={"emp__id__01XXX"}
            firstName={"Employee"}
            lastName={"2"}
            email={"employee__email__id@email.xyz"}
            department={"Backend"}
          />
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
