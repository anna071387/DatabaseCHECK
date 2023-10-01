//Models imported  and allow to create connections and relationships
const Employee = require("./employee.js");
const Department = require("./department.js")
const Role = require("./role.js");
// emloyees have roles
Employee.belongsTo(Role, {
    foreignKey: "role_id",
    onDelete: "CASCADE",
  });
  
//   Only one employee can be manager
Employee.hasOne(Employee, {
    foreignKey: "manager_id",
    onDelete: "CASCADE",
  });
  
// department can have many roles
Department.hasMany(Role, {
    foreignKey: "department_id",
    onDelete: "CASCADE",
  });
// interchangable relationship
Role.belongsTo(Department, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

// interchangable relationship
Role.hasOne(Employee, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
});


module.exports = { Employee, Department, Role }