import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import EmployeeRecord from "./EmployeeRecord";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../component/Loader";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import "./Dashboard.css";

const Dashboard = () => {
  const { getUser, removeUser } = useUser(); // used to manage the authenticated user
  const history = useHistory(); // used for navigation
  const [employees, setEmployees] = useState([]); // manages the employees list
  const [showLoader, setShowLoader] = useState(true); // manages the loader
  const [showAddEmployee, setShowAddEmployee] = useState(false); // manages the show add employee modal
  const [showAEditEmployee, setShowEditEmployee] = useState(false); // manages the show edit employee modal
  const [editEmployeeId, setEditEmployeeId] = useState(""); // manages the show edit employee modal

  useEffect(() => {
    if (getUser() === null) {
      history.push("/login");
    }

    const fetchData = async () => {
      const response = await axios
        .get("http://localhost:8080/api/v1/user/employees", {
          headers: {
            Authorization: `Bearer ${getUser().auth__token}`,
            userId: getUser().auth__userId,
          },
        })
        .catch((err) => {
          setShowLoader(false);
          swal(err.message);
          return;
        });

      if (response === null || response === undefined) {
        swal("Error", "Something wrong happended, try again", "error").then(
          () => {
            removeUser();
            history.push("/login");
          }
        );
      }

      if (response.data.status === 401) {
        swal("Alert", response.data.message, "warning").then(() => {
          removeUser();
          setShowLoader(false);
          history.push("/login");
        });
      } else if (response.data.status === 200) {
        setEmployees(response.data.payload);
        setShowLoader(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEmployee = (id) => {
    swal({
      title: `Are you sure?`,
      text: "This action can't be undone!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (res) => {
      if (res === null) {
        return;
      }

      if (getUser() === null) {
        swal("Please login to continue").then(() => {
          history.push("/login");
        });
      }

      setShowLoader(true);
      const response = await axios
        .delete("http://localhost:8080/api/v1/user/employee", {
          data: {
            auth_id: `${getUser().auth__userId}`,
            emp_id: `${id}`,
          },
          headers: {
            Authorization: `Bearer ${getUser().auth__token}`,
          },
        })
        .then((res) => res.data)
        .catch(() => {
          setShowLoader(false);
        });

      setShowLoader(false);

      if (response.status === 401) {
        removeUser();
        swal("Please login again to continue").then(() =>
          history.push("/login")
        );
      } else if (response.status === 202) {
        swal("Error", response.message, "error");
      } else {
        swal("Success", response.message, "success").then(() => {
          setEmployees((prevData) => {
            return prevData.filter((emp) => emp.id !== id);
          });
        });
      }
    });
  };

  const editEmployee = (id) => {
    setEditEmployeeId(id);
    setShowEditEmployee(true);
  };

  const addEmployeeModal = () => {
    setShowAddEmployee(true);
  };

  const addEmployee = (emp) => {
    if (
      getUser() !== null &&
      getUser().auth__userId !== null &&
      getUser().auth__userId !== ""
    ) {
      const add = async () => {
        setShowLoader(true);
        const employee = {
          ...emp,
          userId: getUser().auth__userId,
        };
        const addResponse = await axios
          .post("http://localhost:8080/api/v1/user/employee", employee, {
            headers: {
              Authorization: `Bearer ${getUser().auth__token}`,
            },
          })
          .catch((err) => {
            setShowLoader(false);
            swal("Error", err.message, "error");
          });

        setShowLoader(false);

        if (addResponse.data.status === 401) {
          swal("Alert", addResponse.data.message, "warning").then(() => {
            removeUser();
            history.push("/login");
          });
        } else if (addResponse.data.status === 200) {
          swal("Congrats", "Employee added successfully", "success").then(
            () => {
              const newEmp = {
                id: addResponse.data.payload.id,
                firstName: addResponse.data.payload.firstName,
                lastName: addResponse.data.payload.lastName,
                email: addResponse.data.payload.email,
                department: addResponse.data.payload.department,
              };

              setEmployees((prevData) => {
                return [...prevData, newEmp];
              });

              setShowLoader(false);
            }
          );
        }
      };

      add();
    } else {
      swal("Error", "Please login to continue", "error").then(() => {
        removeUser();
        history.push("/login");
      });
    }
  };

  const updateEmployee = async (employee) => {
    setShowLoader(true);

    const response = await axios
      .put(
        "http://localhost:8080/api/v1/user/employee",
        {
          ...employee,
          userId: `${getUser().auth__userId}`,
          employeeId: `${employee.id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${getUser().auth__token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        setShowLoader(false);
        swal("Error", err.message, "error");
      });

    setShowLoader(false);
    if (response !== null && response !== undefined) {
      swal(response.message).then(() => {
        setShowEditEmployee(false);
      });
    }
  };

  return (
    <>
      <div className="employee_container">
        <button
          className="add__employee__btn"
          title="Add employee"
          onClick={() => {
            addEmployeeModal();
          }}
        >
          Add Employee
        </button>
        <h1>Employees List</h1>

        <div className="employee__table__container">
          <table className="employee__table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp, idx) => {
                return (
                  <EmployeeRecord
                    key={idx}
                    id={emp.id}
                    serial={idx + 1}
                    firstName={emp.firstName}
                    lastName={emp.lastName}
                    email={emp.email}
                    department={emp.department}
                    onDeleteEmployee={() => {
                      deleteEmployee(emp.id);
                    }}
                    onEditEmployee={() => {
                      editEmployee(emp.id);
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployee
        display={showAddEmployee}
        onCancelAddEmployeeModal={() => {
          setShowAddEmployee(false);
        }}
        onAddEmployee={(emp) => {
          setShowAddEmployee(false);
          addEmployee(emp);
        }}
      />

      <EditEmployee
        display={showAEditEmployee}
        id={editEmployeeId}
        onCancelButtonClick={() => {
          setShowEditEmployee(false);
        }}
        onUpdateButtonClick={(editedEmployee) => {
          updateEmployee(editedEmployee);
        }}
      />

      <Loader display={showLoader} />
    </>
  );
};

export default Dashboard;
