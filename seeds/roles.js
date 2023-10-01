// Allows to seeds data into roles tables

const sequelize = require("../connection");
const Role = require("./models/role.js");

const rolesSeedData = require("./roleSeeds.json");

const seedRoleData = async () => {
  await sequelize.sync({ force: true });

  const roles = await Role.bulkCreate(rolesSeedData);

  process.exit(0);
};

seedRoleData();