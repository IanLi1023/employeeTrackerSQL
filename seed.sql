USE employee_db;
INSERT INTO department (name)
VALUES ('Sales'), ('Finance'), ('Legal');

USE employee_db;
INSERT INTO role (title, salary, department_id)
VALUES ('Lawyer', 100000, 3), ('Accountant', 50000, 2), ('Sales Lead', 75000, 1);

USE employee_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kobe', 'Bryant', 1, NULL ), ('Shaq', 'Oneill', 2, 1), ('Michael', 'Jordan', 3, 2);
