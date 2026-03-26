import React, { useEffect, useState } from "react";
import axios from "axios";

import StudentForm from "./components/StudentForm";
// import StudentList from "./components/StudentList";
import "./App.css";
import "./student-table.css";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTable, setShowTable] = useState(false);

  // fetch data
  const fetchStudents = async () => {
    const res = await axios.get("/api/students");
    setStudents(res.data);
  };

  // delete
  const deleteStudent = async (id) => {
    await axios.delete(`/api/students/${id}`);
    fetchStudents();
    if (showTable) {
      setStudents((prev) => prev.filter((s) => s._id !== id));
    }
  };

  // select for edit
  const selectStudent = (student) => {
    setSelectedStudent(student);
  };

  // clear selection
  const clearSelected = () => {
    setSelectedStudent(null);
  };

  // get all students and show table
  const showAllStudents = async () => {
    await fetchStudents();
    setShowTable(true);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App vibrant-bg">
      <h1>Student Management</h1>
      <StudentForm fetchStudents={fetchStudents} selectedStudent={selectedStudent} clearSelected={clearSelected} />
      <div style={{ textAlign: "center", margin: "24px 0" }}>
        <button className="get-all-btn" onClick={showAllStudents}>Get All Students</button>
      </div>
      {showTable && (
        <div className="student-table-container">
          <h2>All Students</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>School</th>
                <th>Class</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_name}</td>
                  <td>{s.age}</td>
                  <td>{s.school}</td>
                  <td>{s.class}</td>
                  <td>{s.year}</td>
                  <td>
                    <button className="table-edit-btn" onClick={() => selectStudent(s)}>Edit</button>
                    <button className="table-delete-btn" onClick={() => deleteStudent(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;