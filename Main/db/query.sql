-- Retrieve all departments
SELECT * FROM department;

-- Retrieve all roles
SELECT * FROM role;

-- Retrieve all employees
SELECT * FROM employee;

-- Insert a new department
INSERT INTO IF NOT EXISTS department (department_name) VALUES ('Mystery');

-- Insert a new role
INSERT INTO IF NOT EXISTS role (title, salary, department_id) VALUES ('Man of mystery', 85000, 5);

-- Insert a new employee
INSERT INTO IF NOT EXISTS employee (first_name, last_name, role_id, manager_id) VALUES ('Mini', 'Me', 1, 1);

-- Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;

-- Delete a department by ID
DELETE FROM department WHERE id = ?;

-- Delete an employee by ID
DELETE FROM employee WHERE id = ?;

-- Delete a role by ID
DELETE FROM role WHERE id = ?;