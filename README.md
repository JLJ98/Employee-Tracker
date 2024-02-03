# Employee-Tracker

# Description

Employee Tracker is a command-line application designed to help manage a company's employees efficiently, utilizing Node.js, Inquirer, and MySQL. It provides functionalities to view, add, and update the departments, roles, and employees in a company, facilitating better organization and planning.

# Table of Contents

Installation
Usage
Features
Contributing
Questions
Links
Credits
License 


# Installation

To install Employee Tracker, please follow these steps:

Ensure Node.js and MySQL are installed on your machine.

Clone the repository to your local machine.

Open a terminal in the directory where you cloned the repository and run npm install to install the required npm packages.

Initialize the MySQL database using the schema and seed files provided in the db folder.

Create an .env file at the root of the project directory with your MySQL credentials like so:

DB_NAME='employee_tracker_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'

# Usage

Launch the application by running the following command in your terminal: node index.js

Upon start, you'll be greeted with the following options:

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role
Viewing Information
View all departments: Displays a formatted table with department names and IDs.
View all roles: Shows a table including job titles, role IDs, associated departments, and salaries.
View all employees: Presents a detailed table with employee IDs, names, job titles, departments, salaries, and their managers.
Adding Information
Add a department: You'll be prompted to enter a new department name to add it to the database.
Add a role: You're asked to provide the new role's name, salary, and department before adding it to the database.
Add an employee: You'll input the new employee's first name, last name, role, and manager for addition to the database.
Updating Information
Update an employee role: Allows you to select an employee and assign them a new role, updating the database accordingly.

# Features

User-friendly command-line interface.
Ability to view departments, roles, and employee data in organized tables.
Functions to add departments, roles, and employees to your database easily.
Capability to update the roles of existing employees.

# Contributing

We welcome contributions to the Employee Tracker! If you're interested in contributing, please fork the repository, make your changes, and submit a pull request.

# Questions

For questions or issues regarding Employee Tracker, please open an issue on GitHub or contact the project maintainer directly.

# Links

[Link to demo video](https://drive.google.com/file/d/1WWHkjpexIQ-gWYVzINNr5suXNgup91sF/view?usp=sharing)

# Credits

In the development of this application, I utilized external sources for enhancing JavaScript functions, drawing insights from resources such as ASKBCS, Xpert Learning Assistant, ChatGPT,Github Copilot, and YouTube to ensure a comprehensive and effective implementation.

# License

This project is licensed under the terms of the MIT License. See the LICENSE file for details.