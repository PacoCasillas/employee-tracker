
-- Insert a new department
INSERT INTO department (department_name) VALUES ('Mystery');

-- Insert a new role
INSERT INTO role (title, salary, department_id) VALUES ('Man of mystery', 85000, 1);

-- Insert a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id, salary)
VALUES ('Mini', 'Me', 1, 1, 50000);

-- Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;

-- Delete an employee by ID
DELETE FROM employee WHERE id = 98;

-- Delete a department by ID
DELETE FROM department WHERE id = 98;

-- Delete a role by ID
DELETE FROM role WHERE id = 98;