require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const questions = require('./lib/questions');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the EmployeeTracker_db database.`)
  );

  // ask questions
//console.table to display data in a table format

  //for example, if user wants to create a department,
  // ask for the department name
  // you'll need to write a query for that.
function addDepartment(departmentName) {
    const newDepartment = {name: departmentName}
    db.promise().query(('INSERT INTO department SET ?', newDepartment)
    .then(([rows, fields]) => {
        console.log('rows', rows);
        console.log('fields', fields);

    })
    .catch(err => {
        console.log(err)
    })
};

function addRole(RoleTitle) {
  const newRole = {role: titleName}
  db.promise().query(('INSERT INTO role SET ?', newRole)
  .then(([rows, fields]) => {
      console.log('rows', rows);
      console.log('fields', fields);

  })
  .catch(err => {
      console.log(err)
  })
};
function addEmployee(employee) {
  const newEmployee = {Employee: first_name, last_name, manager_id}
  db.promise().query(('INSERT INTO employee SET ?', newEmployee)
  .then(([rows, fields]) => {
      console.log('rows', rows);
      console.log('fields', fields);

  })
  .catch(err => {
      console.log(err)
  })
};