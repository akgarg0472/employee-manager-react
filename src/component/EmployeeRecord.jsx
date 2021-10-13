import React from "react";

const EmployeeRecord = (props) => {
  const { id, firstName, lastName, email, address, department } = props;

  const editEmployee = () => {
    console.log();
  };

  const deleteEmployee = () => {
    props.onDeleteEmployee();
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{address}</td>
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
