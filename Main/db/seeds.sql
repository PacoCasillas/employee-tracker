USE employees_db;

-- Insert sample departments
INSERT INTO department (department_name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Manager', 50000, 1),
  ('Salesperson', 30000, 1),
  ('Marketing Coordinator', 35000, 2),
  ('Accountant', 45000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1),
  ('Emily', 'Davis', 4, 3);