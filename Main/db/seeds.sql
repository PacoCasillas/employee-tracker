USE employees_db;

-- Insert departments
INSERT INTO department (department_name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Manager', 50000, 1),
  ('Salesperson', 30000, 1),
  ('Marketing Coordinator', 35000, 2),
  ('Accountant', 45000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id, salary) VALUES
  ('Dr', 'Evil', 1, NULL, 100000),
  ('Austin', 'Powers', 2, 1, 50000),
  ('Gold', 'Member', 3, 1, 55000),
  ('Chico', 'Casillas', 4, 3, 60000);