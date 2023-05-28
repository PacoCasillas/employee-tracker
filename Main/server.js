// Dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware 
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to the database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    password: 'root',
    database: 'employees_db'
  },
  console.log(`Connected to the employees database.`)
);

// Function to display the main menu
function displayMainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Select an option:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then(answer => {
    switch (answer.option) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit(0);
    }
  });
}

// Function to view all departments
function viewAllDepartments() {
  const sql = 'SELECT * FROM department';
  db.query(sql, (err, result) => {
    if (err) {
      console.log('Error retrieving departments:', err);
    } else {
      console.table(result);
    }
    displayMainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  const sql = 'SELECT * FROM role';
  db.query(sql, (err, result) => {
    if (err) {
      console.log('Error retrieving roles:', err);
    } else {
      console.table(result);
    }
    displayMainMenu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if (err) {
      console.log('Error retrieving employees:', err);
    } else {
      console.table(result);
    }
    displayMainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:'
    }
  ]).then(answer => {
    const sql = 'INSERT INTO department (department_name) VALUES (?)';
    db.query(sql, [answer.departmentName], (err, result) => {
      if (err) {
        console.log('Error adding department:', err);
      } else {
        console.log('Department added successfully!');
      }
      displayMainMenu();
    });
  });
}

// Function to add a role
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'number',
      name: 'salary',
      message:  'Enter the salary for the role:'
    },
    {
      type: 'number',
      name: 'departmentId',
      message: 'Enter the department ID for the role:'
    }
  ]).then(answer => {
    const { title, salary, departmentId } = answer;
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    db.query(sql, [title, salary, departmentId], (err, result) => {
      if (err) {
        console.log('Error adding role:', err);
      } else {
        console.log('Added role successfully!');
      }
      displayMainMenu();
    });
  });
}

// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'number',
      name: 'roleId',
      message: 'Enter the role ID for the employee:'
    },
    {
      type: 'number',
      name: 'managerId',
      message: 'Enter the manager ID for the employee:'
    }
  ]).then(answer => {
    const { firstName, lastName, roleId, managerId } = answer;
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, roleId, managerId], (err, result) => {
      if (err) {
        console.log('Error adding employee:', err);
      } else {
        console.log('Employee added successfully!');
      }
      displayMainMenu();
    });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  // Fetch the list of employees
  const fetchEmployeesQuery = 'SELECT id, first_name, last_name FROM employee';
  db.query(fetchEmployeesQuery, (err, employees) => {
    if (err) {
      console.log('Error retrieving employees:', err);
      displayMainMenu();
      return;
    }

    const employeeChoices = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }));

    // Prompt to select an employee
    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update their role:',
        choices: employeeChoices
      }
    ]).then(answer => {
      const { employeeId } = answer;

      // Fetch the list of roles
      const fetchRolesQuery = 'SELECT id, title FROM role';
      db.query(fetchRolesQuery, (err, roles) => {
        if (err) {
          console.log('Error retrieving roles:', err);
          displayMainMenu();
          return;
        }

        const roleChoices = roles.map(role => ({
          name: role.title,
          value: role.id
        }));

        // Prompt to select a new role
        inquirer.prompt([
          {
            type: 'list',
            name: 'roleId',
            message: 'Select a new role for the employee:',
            choices: roleChoices
          }
        ]).then(answer => {
          const { roleId } = answer;

          // Update the employee's role
          const updateRoleQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';
          db.query(updateRoleQuery, [roleId, employeeId], (err, result) => {
            if (err) {console.log('Error updating employee role:', err);
          } else {
            console.log('Employee role updated successfully!');
          }
          displayMainMenu();
        });
      });
    });
  });
});
}

// Start the application
displayMainMenu();


// Create POST routes

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


// Create GET routes

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


// Handle other HTTP methods

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


// Handle other routes (Not Found)

app.use((req, res) => {
  res.status(404).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});