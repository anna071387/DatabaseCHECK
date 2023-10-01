//This will allow to seed date into employee table

const sequelize = require("./connection");
// must include sequilize connection
const Employee = require("./Models/employee");

const employeesSeedData = require("./employeesSeedData.json");

const seedEmployeeData = async () => {
  await sequelize.sync({ force: true });

  const employees = await Employee.bulkCreate(employeesSeedData);

  process.exit(0);
};

seedEmployeeData();