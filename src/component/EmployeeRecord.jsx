import React from "react";

const EmployeeRecord = (props) => {
  const { serial, firstName, lastName, email, department } = props;

  const deleteEmployee = () => {
    props.onDeleteEmployee();
  };

  const editEmployee = () => {
    props.onEditEmployee();
  };

  return (
    <tr>
      <td>{serial}</td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{department}</td>
      <td>
        <i
          className="fas fa-pencil-alt action__btn"
          title="Edit"
          onClick={() => editEmployee()}
        ></i>

        <i
          className="fas fa-trash-alt action__btn"
          title="Delete"
          onClick={() => deleteEmployee()}
        ></i>
      </td>
    </tr>
  );
};

export default EmployeeRecord;
