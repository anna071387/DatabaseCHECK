//Creating table for the roles

const { Model, DataTypes } = require("sequelize");
// must have sequilize connection
const sequelize = require("../connection");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.DECIMAL,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Department",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Role",
  }
);

module.exports = Role;