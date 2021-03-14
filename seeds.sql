INSERT INTO department (name)
VALUES ('Accounting'),('Sales'),('Quality Assurance'),('Reception'),('Annex'),('Corporate'),('Warehouse');

INSERT INTO company_role (title, salary, department_id)
VALUES ('Accounting Manager',84000.00,(SELECT id FROM department WHERE department_name='Accounting')), -- Accounting --
       ('Accountant',73000.00,(SELECT id FROM department WHERE department_name='Accounting')), -- Accounting --
       ('Sales Manager',82000.00,(SELECT id FROM department WHERE department_name='Sales')), -- Sales --
       ('Assistant to the Regional Manager',82000.00,(SELECT id FROM department WHERE department_name='Sales')), -- Sales --
       ('Sales person',60000.00,(SELECT id FROM department WHERE department_name='Sales')), -- Sales --
       ('QA-Specialist',65000.00,(SELECT id FROM department WHERE department_name='Quality Assurance')), -- Quality Assurance --
       ('Receptionist',60000.00,(SELECT id FROM department WHERE department_name='Reception')), -- Reception --
       ('Customer Serice', 50000.00,(SELECT id FROM department WHERE department_name='Annex')), -- Annex --
       ('HR-Director',80000.00,(SELECT id FROM department WHERE department_name='Annex')), -- Annex --
       ('Regional Manager',100000.00,(SELECT id FROM department WHERE department_name='Corporate')), -- Corporate --
       ('Warehouse Manager',70000.00,(SELECT id FROM department WHERE department_name='Warehouse')), -- Warehouse --
       ('Warehouse employee', 65000.00,(SELECT id FROM department WHERE department_name='Warehouse')) -- Warehouse --

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ('Angela','Martin',(SELECT id FROM company_role WHERE title='Accounting Manager'),null),
       ('Oscar','Martinez',(SELECT id FROM company_role WHERE title='Accountant'),(SELECT id FROM company_role WHERE title='Accounting Manager'))