const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
let students = [ { id: '1', name: 'Alice', grade: 'A' }, { id: '2', name: 'Bob', grade: 'B' } ];

app.get('/students', (req, res) => res.json(students));
app.get('/students/:id', (req, res) => res.json(students.find(s => s.id == req.params.id)));
app.post('/students', (req, res) => { students.push(req.body); res.json(req.body); });
app.put('/students/:id', (req, res) => { students = students.map(s => s.id == req.params.id ? { ...s, ...req.body } : s); res.json({ success: true }); });
app.delete('/students/:id', (req, res) => { students = students.filter(s => s.id != req.params.id); res.json({ success: true }); });
app.listen(5000, () => console.log('Server running on port 5000'));
