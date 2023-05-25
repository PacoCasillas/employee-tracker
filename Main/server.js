// Dependencies
const express = require('express');
const inquierer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

// Create POST

app.post('/departments', (req, res) => {
    const { department_name } = req.body;
    const sql = 'INSERT INTO department (department_name) VALUES (?)';
    db.query(sql, [department_name], (err, result) => {
      if (err) {
        res.status(400).json({ error: 'Bad Request' });
        return;
      }
      res.json({ message: 'Department added successfully' });
    });
  });

  app.post('/roles', (req, res) => {
    const { title, salary, department_id } = req.body;
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    db.query(sql, [title, salary, department_id], (err, result) => {
      if (err) {
        res.status(400).json({ error: 'Bad Request' });
        return;
      }
      res.json({ message: 'Role added successfully' });
    });
  });


  app.post('/employees', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
      if (err) {
        res.status(400).json({ error: 'Bad Request' });
        return;
      }
      res.json({ message: 'Employee added successfully' });
    });
  });


// GET

app.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });

  app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM role';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });


  app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });


// Delete ______



// BONUS: Update _______ name 

app.put('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const { role_id } = req.body;
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    db.query(sql, [role_id, employeeId], (err, result) => {
      if (err) {
        res.status(400).json({ error: 'Bad Request' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
      res.json({ message: 'Employee role updated successfully' });
    });
  });



// Default response for any other request (Not Found)

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
});