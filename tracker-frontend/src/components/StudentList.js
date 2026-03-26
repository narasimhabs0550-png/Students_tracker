import React from "react";

function StudentList({ students, deleteStudent, selectStudent, getStudent }) {
  return (
    <div className="student-list">
      <h2>Students</h2>
      <div className="student-list-grid">
        {students.map((s) => (
          <div className="student-card" key={s._id}>
            <div className="student-info">
              <span className="student-name">{s.student_name}</span>
              <span className="student-school">{s.school}</span>
            </div>
            <div className="student-actions">
              <button onClick={() => selectStudent(s)}>Edit</button>
              <button onClick={() => getStudent(s._id)}>Get</button>
              <button onClick={() => deleteStudent(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;