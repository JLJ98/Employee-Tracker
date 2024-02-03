use `employee_db`;

-- Insert departments
INSERT INTO `department` (`name`) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

-- Insert roles
INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES
('Software Engineer', 100000, 1),
('Sales Lead', 80000, 2),
('Accountant', 70000, 3),
('Lawyer', 120000, 4);

-- Insert employees
INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, 1),
('Kevin', 'Tupik', 4, 1),
('Kunal', 'Singh', 1, 1),
('Malia', 'Brown', 2, 5),
('Tom', 'Allen', 3, 5),
('Tanya', 'Adams', 4, 5);
