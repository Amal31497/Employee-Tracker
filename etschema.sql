DROP DATABASE IF EXISTS organization_db;

CREATE database organization_db;

USE organization_db;

CREATE TABLE employee(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES company_role (role_id),
    FOREIGN KEY (manager_id) REFERENCES company_role (role_id)
);

CREATE TABLE company_role(
    role_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (role_id),
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (department_id)
);

CREATE TABLE department(
    department_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(department_id)
);



