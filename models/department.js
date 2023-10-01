// Creating deparment table

const { Model, DataTypes } = require("sequelize");
// require sequilize connection
const sequelize = require("../connection");

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Department",
  }
);

module.exports = Department;