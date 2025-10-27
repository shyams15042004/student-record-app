// App.js
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const API = "https://student-record-app-backend.onrender.com"; // 🔗 your live backend URL

function View() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get(`${API}/students`).then(res => setStudents(res.data));
  }, []);
  return (
    <div>
      <h2>All Students</h2>
      {students.map(s => (
        <p key={s.id}>
          {s.id}. {s.name} - {s.grade}
        </p>
      ))}
    </div>
  );
}

function Add() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const submit = () => {
    axios.post(`${API}/students`, { id, name, grade }).then(() => alert("Student Added"));
  };
  return (
    <div>
      <h2>Add Student</h2>
      <input placeholder="ID" onChange={e => setId(e.target.value)} /><br/>
      <input placeholder="Name" onChange={e => setName(e.target.value)} /><br/>
      <input placeholder="Grade" onChange={e => setGrade(e.target.value)} /><br/>
      <button onClick={submit}>Add</button>
    </div>
  );
}

function Update() {
  const [id, setId] = useState("");
  const [grade, setGrade] = useState("");
  const update = () => {
    axios.put(`${API}/students/${id}`, { grade }).then(() => alert("Updated"));
  };
  return (
    <div>
      <h2>Update Grade</h2>
      <input placeholder="ID" onChange={e => setId(e.target.value)} /><br/>
      <input placeholder="New Grade" onChange={e => setGrade(e.target.value)} /><br/>
      <button onClick={update}>Update</button>
    </div>
  );
}

function Delete() {
  const [id, setId] = useState("");
  const del = () => {
    axios.delete(`${API}/students/${id}`).then(() => alert("Deleted"));
  };
  return (
    <div>
      <h2>Delete Student</h2>
      <input placeholder="ID" onChange={e => setId(e.target.value)} /><br/>
      <button onClick={del}>Delete</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">View</Link> |{" "}
        <Link to="/add">Add</Link> |{" "}
        <Link to="/update">Update</Link> |{" "}
        <Link to="/delete">Delete</Link>
      </nav>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </Router>
  );
}
