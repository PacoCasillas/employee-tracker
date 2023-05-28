USE employees_db;

-- Sample departments
INSERT IGNORE INTO department (department_name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Sample roles
INSERT IGNORE INTO role (title, salary, department_id) VALUES
  ('Manager', 50000, 1),
  ('Salesperson', 30000, 1),
  ('Marketing Coordinator', 35000, 2),
  ('Accountant', 45000, 3);

-- Sample employees
INSERT IGNORE INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Dr', 'Evil', 1, NULL),
  ('Austin', 'Powers', 2, 1),
  ('Gold', 'Member', 3, 1),
  ('Chico', 'Casillas', 4, 3);