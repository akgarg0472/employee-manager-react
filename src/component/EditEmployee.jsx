import axios from "axios";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "./EmployeeModal.css";

const EditEmployee = (props) => {
  const { display, id, onCancelButtonClick, onUpdateButtonClick } = props;
  const { getUser, removeUser } = useUser();
  const history = useHistory();
  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    department: "",
  });

  useEffect(() => {
    const fetchEmp = async () => {
      if (getUser() === null || getUser() === undefined) {
        swal("Error", "Please login to continue", "error").then(() => {
          removeUser();
          history.push("/login");
        });
      }

      // if there is some employee id
      if (id !== "") {
        const response = await axios
          .get(`http://localhost:8080/api/v1/user/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${getUser().auth__token}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => {
            swal("Error", err.message, "error");
          });

        if (response === null || response === undefined) {
          swal(
            "Error",
            "Error fetching employee data, please try again",
            "error"
          );
          return;
        }

        if (response.status !== 200) {
          swal("Something wrong happended", response.message, "warning");
        } else {
          setEmployee({
            id: response.payload.id,
            firstName: response.payload.firstName,
            lastName: response.payload.lastName,
            email: response.payload.email,
            phone: response.payload.phone,
            address: response.payload.address,
            department: response.payload.department,
          });
        }
      }
    };

    fetchEmp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateEmployee = (e) => {
    setEmployee((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <div
        className="edit__employee__modal__container"
        style={{
          display: display ? "flex" : "none",
        }}
      >
        <div className="modal">
          <h1 className="modal__header">{`Edit ${employee.firstName} ${employee.lastName}`}</h1>

          <div className="modal__body">
            <input
              className="modal__input"
              type="text"
              name="firstName"
              value={employee.firstName}
              onChange={updateEmployee}
            />
            <input
              className="modal__input"
              type="text"
              name="lastName"
              value={employee.lastName}
              onChange={updateEmployee}
            />
            <input
              className="modal__input"
              type="email"
              name="email"
              value={employee.email}
              onChange={updateEmployee}
            />
            <input
              className="modal__input"
              type="text"
              name="address"
              value={employee.address}
              onChange={updateEmployee}
            />
            <input
              className="modal__input"
              type="text"
              name="phone"
              value={employee.phone}
              onChange={updateEmployee}
            />
            <select
              name="department"
              className="modal__input"
              onChange={updateEmployee}
              value={employee.department}
            >
              <option value="none">---Select Department---</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Cloud">Cloud</option>
              <option value="IT">IT</option>
              <option value="Graphics Design">Graphics Design</option>
            </select>
          </div>

          <div className="modal__footer">
            <button
              className="modal__btn"
              onClick={() => {
                onCancelButtonClick();
              }}
            >
              Cancel
            </button>
            <button
              className="modal__btn"
              onClick={() => {
                onUpdateButtonClick(employee);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
