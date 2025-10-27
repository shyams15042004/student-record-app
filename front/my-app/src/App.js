import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then(res => setStudents(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      axios.delete(`http://localhost:5000/students/${id}`).then(() => {
        setStudents(students.filter(s => s.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/add">Add New</Link>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", marginTop: 10 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.grade}</td>
              <td>
                <Link to={`/update/${s.id}`}>Edit</Link> | {" "}
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", name: "", grade: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.grade) return alert("All fields required");
    axios.post("http://localhost:5000/students", form).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input placeholder="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Grade" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
      <button type="submit">Add</button>
    </form>
  );
}

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", name: "", grade: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, form).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Student</h2>
      <input placeholder="ID" value={form.id} disabled />
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Grade" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "sans-serif", margin: 20 }}>
        <h1>Student Record Management</h1>
        <nav style={{ marginBottom: 10 }}>
          <Link to="/">View</Link> | <Link to="/add">Add</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ViewStudents />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

