import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeTable.module.css";
function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setEmployees(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStartEndIndex = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = currentPage * 10;
    return { startIndex, endIndex };
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees
              .slice(getStartEndIndex().startIndex, getStartEndIndex().endIndex)
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="buttona">
        <button onClick={handlePreviousClick}>Previous</button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
