USE employee_tracker;

INSERT INTO department (name)
VALUES
  ('Customer Service'),
  ('Billing'),
  ('Account Receivable'),
  ('Account Payable'),
  ('Payroll'),
  ('Engineering'),
  ('Nursing');


USE employee_tracker;

INSERT INTO role (title, salary, department_id)
VALUES
  ('Customer Server Rep',23000 ,1),
  ('Billing Specialist', 34800, 2),
  ('Junior Account', 45333, 3),
  ('Senior Accountant', 55600,4 ),
  ('Payroll Specilist', 45666,5 ),
  ('Senior Engineer' , 58899,6),
  ('Registered Nurse', 76000,7);



USE employee_tracker;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Phillips','Gribbs',2,2)
;