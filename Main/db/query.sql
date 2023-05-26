-- Retrieve all departments
SELECT * FROM department;

-- Retrieve all roles
SELECT * FROM role;

-- Retrieve all employees
SELECT * FROM employee;

-- Insert a new department
INSERT INTO department (department_name) VALUES ('Sales');

-- Insert a new role
INSERT INTO role (title, salary, department_id) VALUES ('Manager', 50000, 1);

-- Insert a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mini', 'Me', 1, 1);

-- Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;