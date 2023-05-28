-- Option 1: Retrieve all departments
SELECT * FROM department;

-- Option 2: Retrieve all roles
SELECT * FROM role;

-- Option 3: Retrieve all employees
SELECT * FROM employee;

-- Option 4: Insert a new department
INSERT INTO department (department_name) VALUES ('Mystery');

-- Option 5: Insert a new role
INSERT INTO role (title, salary, department_id) VALUES ('Man of mystery', 85000, 5);

-- Option 6: Insert a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mini', 'Me', 1, 1);

-- Option 7: Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;