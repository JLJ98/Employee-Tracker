
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const consoleTable = require('console.table');
require('dotenv').config()
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME  
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
  runPrompt();
});

// Function to run the initial prompt
function runPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then((answers) => {
    switch (answers.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${answers.action}`);
        runPrompt();
    }
  });
}

// Functions for each action
function viewDepartments() {
  // Query the database and show the departments
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    runPrompt();
  });
}

function viewRoles() {
  // Query the database and show the roles
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    runPrompt();
  });
}

function viewEmployees() {
  // Query the database and show the employees
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    runPrompt();
  });
}

function addDepartment() {
  // Prompt the user for the new department name and add it to the database
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:'
    }
  ]).then((answers) => {
    connection.query('INSERT INTO department SET ?', answers, (err, results) => {
      if (err) throw err;
      console.log('Department added.');
      runPrompt();
    });
  });
}


  // Prompt the user for the new role details and add it to the database
  function addRole() {
    // First, we might want to get the list of departments to let the user choose
    connection.query('SELECT * FROM department', (err, departments) => {
      if (err) throw err;
  
      // Map departments to choices for inquirer
      const departmentChoices = departments.map(dept => ({
        name: dept.name,
        value: dept.id // We use the id as the value for easier reference
      }));
  
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the new role?',
          validate: input => input ? true : 'Please enter a title.'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for the new role?',
          validate: input => !isNaN(input) ? true : 'Please enter a valid number.'
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does the role belong to?',
          choices: departmentChoices
        }
      ]).then(answers => {
        // Insert the new role into the database
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        connection.query(query, [answers.title, answers.salary, answers.departmentId], (err, res) => {
          if (err) throw err;
          console.log('Role added successfully!');
          // Go back to the main menu or exit
          runPrompt();
        });
      });
    });
  }
  


function addEmployee() {
  // Prompt the user for the new employee details and add it to the database

    // Get roles from the database for the choices
    connection.query('SELECT id, title FROM role', (err, roles) => {
      if (err) throw err;
  
      // Map roles to choices for inquirer
      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));
  
      // Get managers from the database; assuming an employee can be a manager
      connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
        if (err) throw err;
  
        // Map employees to choices for inquirer, including an option for no manager
        const managerChoices = employees.map(emp => ({
          name: emp.name,
          value: emp.id
        })).concat([{ name: "None", value: null }]);
  
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: input => input ? true : "Please enter a first name."
          },
          {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: input => input ? true : "Please enter a last name."
          },
          {
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'managerId',
            message: "Who is the employee's manager?",
            choices: managerChoices
          }
        ]).then(answers => {
          // Insert the new employee into the database
          const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
          connection.query(query, [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err, res) => {
            if (err) throw err;
            console.log("Employee added successfully!");
            // Go back to the main menu or exit
            runPrompt();
          });
        });
      });
    });
  }
  


  function updateEmployeeRole() {
    // Fetch employees from the database
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
      if (err) throw err;
  
      // Map employees to choices for inquirer
      const employeeChoices = employees.map(employee => ({
        name: employee.name,
        value: employee.id
      }));
  
      // Fetch roles from the database
      connection.query('SELECT id, title FROM role', (err, roles) => {
        if (err) throw err;
  
        // Map roles to choices for inquirer
        const roleChoices = roles.map(role => ({
          name: role.title,
          value: role.id
        }));
  
        inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'newRoleId',
            message: "What's the new role for the selected employee?",
            choices: roleChoices
          }
        ]).then(answers => {
          // Update the employee's role in the database
          const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
          connection.query(query, [answers.newRoleId, answers.employeeId], (err, res) => {
            if (err) throw err;
            console.log("Employee's role updated successfully!");
            // Go back to the main menu or exit
            runPrompt();
          });
        });
      });
    });
  }
  



// Start the application by running the initial prompt
runPrompt();
