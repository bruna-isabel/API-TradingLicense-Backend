
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING
        }
    })
    return Role;
};