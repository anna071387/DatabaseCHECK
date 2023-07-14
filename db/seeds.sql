INSERT INTO department (id, name)
VALUES
    (1, Engineering)
    (2, Finance)
    (3, Legal)
    (4, Sales)
    (5, Service)


INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, Sales Lead, 100000, 4)  
    (2, SalesPerson, 80000, 4)
    (3, Lead Engineer, 150000, 1)
    (4, Software Engineer, 120000, 1)
    (5, Accountant Manager, 160000, 2)
    (6, Accountant, 1250000, 2)
    (7, Legal Team Lead, 250000, 1)

INSERT INTO employee (id, first_name, last_name, manager_id)
VALUES
    (1, John, Doe, null) 
    (2, Mike, Chan, John Doe)
    (3, Ashley, Rodriguez, null)
    (4, Kevin, Tupik, Ashley Rodriguez)
    (5, Kunal, Singh, null)
    (6, Malia, Brown, Kunal Singh)
    (7, Sarah, Lourd, null)
    (8, Allen, Lawyer, Sarah Lourd)