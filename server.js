require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const sequelize = require("./connection");
const { Employee, Department, Role } = require("./models");

// Syncs the database with created models
sequelize.sync({ force: false }).then(() => {
  options();
});

// Choose the action, allows the user to select an action
function options() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
        ],
        name: "employeeTracker",
      },
    ])
    .then((answer) => {
      if (answer.employeeTracker === "View All Departments") {
        viewAllDepartments();
      } else if (answer.employeeTracker === "View All Roles") {
        viewAllRoles();
      } else if (answer.employeeTracker === "View All Employees") {
        viewAllEmployees();
      } else if (answer.employeeTracker === "Add Department") {
        addDepartment();
      } else if (answer.employeeTracker === "Add Role") {
        addRole();
      } else if (answer.employeeTracker === "Add Employee") {
        addEmployee();
      } else {
        updateEmployeeRole();
      }
    });
}

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

//   // ask questions
// //console.table to display data in a table format

// View all departments
const viewAllDepartments = () => {
  var departments = Department.findAll({ raw: true }).then((data) => {
    console.table(data);
    // Fires off prompts after table is displayed
    options();
  });
};

//table for reviewing all the roles in the department
const viewAllRoles = () => {
  var roles = Role.findAll({
    raw: true,
    // Joining Department table and Role table
    include: [{ model: Department }],
  }).then((data) => {
    console.table(
      // Loops through data and returns new object, used to format tables
      data.map((role) => {
        return {
          id: role.id,
          title: role.title,
          salary: role.salary,
          department: role["Department.name"],
        };
      })
    );
    // Fires off prompts after table is displayed
    options();
  });
};

// View all data for employees
const viewAllEmployees = () => {
  var employees = Employee.findAll({
    raw: true,
    include: [{ model: Role, include: [{ model: Department }] }],
  }).then((data) => {
    const employeeLookup = {};
    for (var i = 0; i < data.length; i++) {
      const employee = data[i];
      employeeLookup[employee.id] =
        employee.first_name + " " + employee.last_name;
    }
    // Log the taable with the existing data
    console.table(
      data.map((employee) => {
        return {
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          title: employee["Role.title"],
          department: employee["Role.Department.name"],
          salary: employee["Role.salary"],
          manager: employeeLookup[employee.manager_id],
        };
      })
    );

    options();
  });
};


const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What would you like to name the department?",
        name: "addDepartment",
      },
    ])
    .then((answer) => {
      Department.create({ name: answer.addDepartment }).then((data) => {
     
        options();
      });
    });
};


const addRole = async () => {
  let departments = await Department.findAll({
    attributes: [
      ["id", "value"],
      ["name", "name"],
    ],
  });

  departments = departments.map((department) =>
    department.get({ plain: true })
  );

  
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "title",
      },
      {
        type: "input",
        message: "What would you like the salary to be?",
        name: "salary",
      },
      {
        type: "list",
        message: "What department would you like to add this new role to?",
        name: "department_id",
        choices: departments,
      },
    ])
    .then((answer) => {
      Role.create(answer).then((data) => {
        options();
      });
    });
};

// Add employee
const addEmployee = async () => {
  let roles = await Role.findAll({
    attributes: [
      ["id", "value"],
      ["title", "name"],
    ],
  });

  roles = roles.map((role) => role.get({ plain: true }));

  let managers = await Employee.findAll({
    attributes: [
      ["id", "value"],
      ["first_name", "name"],
      ["last_name", "lastName"],
    ],
  });

  managers = managers.map((manager) => {
    manager.get({ plain: true });
    const managerInfo = manager.get();
    return {
      name: `${managerInfo.name} ${managerInfo.lastName}`,
      value: managerInfo.value,
    };
  });
  managers.push({ type: "Null Manager", value: null });

  //Requirer allows to interract to retrive needed data
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the new employee?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the last name of the new employee?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the role of the new employee?",
        name: "role_id",
        choices: roles,
      },
      {
        type: "list",
        message: "What manager would you like to assign to the new employee?",
        name: "manager_id",
        choices: managers,
      },
    ])
    .then((answer) => {
      Employee.create(answer).then((data) => {
       
        options();
      });
    });
};




const updateEmployeeRole = async () => {
  let employees = await Employee.findAll({
    attributes: [
      ["id", "value"],
      ["first_name", "name"],
      ["last_name", "lastName"],
    ],
  });

  employees = employees.map((employee) => {
    employee.get({ plain: true });
    const employeeInfo = employee.get();
    return {
      name: `${employeeInfo.name} ${employeeInfo.lastName}`,
      value: employeeInfo.value,
    };
  });

  let roles = await Role.findAll({
    attributes: [
      ["id", "value"],
      ["title", "name"],
    ],
  });

  roles = roles.map((role) => role.get({ plain: true }));

  
  inquirer
    .prompt([
      {
        type: "list",
        message: "Who is the employee whose role you would like to update?",
        name: "id",
        choices: employees,
      },
      {
        type: "list",
        message:
          "What is the name of the updated role would you like to assign to this employee?",
        name: "role_id",
        choices: roles,
      },
    ])
    .then((answer) => {
      Employee.update(answer, {
        where: {
          id: answer.id,
        },
      }).then((data) => {

        options();
      });
    });
};


//   //for example, if user wants to create a department,
//   // ask for the department name
//   // you'll need to write a query for that.
// function addDepartment(departmentName) {
//     const newDepartment = {name: departmentName}
//     db.promise().query(('INSERT INTO department SET ?', newDepartment)
//     .then(([rows, fields]) => {
//         console.log('rows', rows);
//         console.log('fields', fields);

//     })
//     .catch(err => {
//         console.log(err)
//     })
// };

// function addRole(RoleTitle) {
//   const newRole = {role: titleName}
//   db.promise().query(('INSERT INTO role SET ?', newRole)
//   .then(([rows, fields]) => {
//       console.log('rows', rows);
//       console.log('fields', fields);

//   })
//   .catch(err => {
//       console.log(err)
//   })
// };
// function addEmployee(employee) {
//   const newEmployee = {Employee: first_name, last_name, manager_id}
//   db.promise().query(('INSERT INTO employee SET ?', newEmployee)
//   .then(([rows, fields]) => {
//       console.log('rows', rows);
//       console.log('fields', fields);

//   })
//   .catch(err => {
//       console.log(err)
//   })
// };


