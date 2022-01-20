DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
);
    
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    INDEX man_ind (manager_id),
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE
);

    
