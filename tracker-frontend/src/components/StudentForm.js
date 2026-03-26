import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ fetchStudents, selectedStudent, clearSelected }) {
  const [form, setForm] = useState({
    student_name: "",
    age: "",
    school: "",
    class: "",
    year: ""
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setForm(selectedStudent);
      setIsEdit(true);
    } else {
      setForm({ student_name: "", age: "", school: "", class: "", year: "" });
      setIsEdit(false);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit && form._id) {
      await axios.put(`/api/students/${form._id}`, form);
    } else {
      await axios.post("/api/students", form);
    }
    fetchStudents();
    clearSelected();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Student" : "Add Student"}</h2>
      <input name="student_name" placeholder="Name" value={form.student_name} onChange={handleChange} required />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
      <input name="school" placeholder="School" value={form.school} onChange={handleChange} required />
      <input name="class" placeholder="Class" value={form.class} onChange={handleChange} required />
      <input name="year" placeholder="Year" value={form.year} onChange={handleChange} required />
      <div className="form-actions">
        <button type="submit">{isEdit ? "Update" : "Add"} Student</button>
        {isEdit && <button type="button" onClick={clearSelected}>Cancel</button>}
      </div>
    </form>
  );
}

export default StudentForm;