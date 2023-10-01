//Proves data for seeding departments

const sequelize = require("./connection");
const Department = require("./Models/department");

const departmentsSeedData = require("./departmentsSeedData.json");

const seedDepartmentData = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentsSeedData);

  process.exit(0);
};

seedDepartmentData();