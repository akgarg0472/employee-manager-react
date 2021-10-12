import React from "react";
import swal from "sweetalert";

const EmployeeRecord = (props) => {
  const { id, firstName, lastName, email, department } = props;

  const editEmployee = (employeeId) => {
    swal(`Edit employee: ${employeeId}`);
  };

  const deleteEmployee = (employeeId) => {
    swal(`Delete employee: ${employeeId}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{department}</td>
      <td>
        <i
          className="fas fa-pencil-alt action__btn"
          title="Edit"
          onClick={() => editEmployee(id)}
        ></i>

        <i
          className="fas fa-trash-alt action__btn"
          title="Delete"
          onClick={() => deleteEmployee(id)}
        ></i>
      </td>
    </tr>
  );
};

export default EmployeeRecord;
