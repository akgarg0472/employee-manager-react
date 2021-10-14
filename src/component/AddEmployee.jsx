import React, { useState } from "react";
import { emailFormatCheckRegex } from "../values/ConstantsAndValues";
import "./EmployeeModal.css";

const AddEmployee = (props) => {
  const { display } = props;
  const [newEmployeeData, setNewEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    department: "",
  });

  const updateNewEmployeeData = (e) => {
    setNewEmployeeData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addEmployee = () => {
    const validate = validateForm();
    if (validate === true) {
      props.onAddEmployee(newEmployeeData);
    }
  };

  const validateForm = () => {
    const error = document.querySelector("#error");
    error.style.display = "none";

    if (newEmployeeData.lastName.trim() === "") {
      error.innerHTML = "Please enter last name";
      error.style.display = "block";
      return false;
    }

    if (
      newEmployeeData.email.trim() === "" ||
      !emailFormatCheckRegex.test(newEmployeeData.email.trim())
    ) {
      error.innerHTML = "Please enter valid email";
      error.style.display = "block";
      return false;
    }

    if (newEmployeeData.address.trim() === "") {
      error.innerHTML = "Please enter valid address";
      error.style.display = "block";
      return false;
    }

    if (newEmployeeData.phone.trim().length !== 10) {
      error.innerHTML = "Please enter valid phone number";
      error.style.display = "block";
      return false;
    }

    if (
      newEmployeeData.department.trim() === "" ||
      newEmployeeData.department === "none"
    ) {
      error.innerHTML = "Please select department";
      error.style.display = "block";
      return false;
    }

    return true;
  };

  return (
    <>
      <div
        className="add__employee__modal__container"
        style={{
          display: display === true ? "flex" : "none",
        }}
      >
        <div className="modal">
          <h1 className="modal__header">Add Employee</h1>

          <div className="modal__body">
            <input
              className="modal__input"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newEmployeeData.firstName}
              onChange={updateNewEmployeeData}
            />
            <input
              className="modal__input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newEmployeeData.lastName}
              onChange={updateNewEmployeeData}
            />
            <input
              className="modal__input"
              type="email"
              name="email"
              placeholder="Email-id"
              value={newEmployeeData.email}
              onChange={updateNewEmployeeData}
            />
            <input
              className="modal__input"
              type="text"
              name="address"
              placeholder="Address"
              value={newEmployeeData.address}
              onChange={updateNewEmployeeData}
            />
            <input
              className="modal__input"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newEmployeeData.phone}
              onChange={updateNewEmployeeData}
            />
            <select
              name="department"
              className="modal__input"
              onChange={updateNewEmployeeData}
            >
              <option value="none">---Select Department---</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Cloud">Cloud</option>
              <option value="IT">IT</option>
              <option value="Graphics Design">Graphics Design</option>
            </select>

            <span id="error">This is sample error</span>
          </div>

          <div className="modal__footer">
            <button
              className="modal__btn"
              onClick={() => {
                setNewEmployeeData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  address: "",
                  phone: "",
                  department: "",
                });

                document.querySelector("#error").display = "none";
                document.querySelector("#error").innerHTML = "";
                props.onCancelAddEmployeeModal();
              }}
            >
              Cancel
            </button>
            <button className="modal__btn" onClick={addEmployee}>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
