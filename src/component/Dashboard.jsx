import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import EmployeeRecord from "./EmployeeRecord";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../component/Loader";
import "./Dashboard.css";

const Dashboard = () => {
  const { getUser, removeUser } = useUser(); // used to manage the authenticated user
  const history = useHistory(); // used for navigation
  const [employees, setEmployees] = useState([]); // manages the employees list
  const [showLoader, setShowLoader] = useState(true); // manages the loader

  useEffect(() => {
    if (getUser() === null) {
      history.push("/login");
    }

    const fetchData = async () => {
      const response = await axios
        .get("http://localhost:8080/api/v1/user/employees", {
          headers: {
            Authorization: `Bearer ${getUser().auth__token}`,
          },
        })
        .catch(() => {
          setShowLoader(false);
          swal("Something wrong happended, please try again");
          return;
        });

      if (response.data.status === 401) {
        swal("Alert", response.data.message, "warning").then(() => {
          removeUser();
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
      title: `Are you sure want to delete ${id}`,
      text: "This action can't be undone",
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
        swal("Success", response.message, "success");
        setEmployees((prevData) => {
          return prevData.filter((emp) => emp.id !== id);
        });
      }
    });
  };

  return (
    <>
      <div className="employee_container">
        <h1>Showing all Employees 😁</h1>

        <div className="employee__table__container">
          <table className="employee__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Department</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((emp, idx) => {
                return (
                  <EmployeeRecord
                    key={idx}
                    id={emp.id}
                    firstName={emp.firstName}
                    lastName={emp.lastName}
                    email={emp.email}
                    address={emp.address}
                    department={emp.department}
                    onDeleteEmployee={() => {
                      deleteEmployee(emp.id);
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Loader display={showLoader} />
    </>
  );
};

export default Dashboard;
