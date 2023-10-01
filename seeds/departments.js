//Proves data for seeding departments

const sequelize = require("./connection");
const Department = require("./models/department.js");

const departmentsSeedData = require("./departmentSeeds.json");

const seedDepartmentData = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentsSeedData);

  process.exit(0);
};

seedDepartmentSeeds();