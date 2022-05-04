// address table written using sequlieze syntax
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    });
    Address.associate = (models) => {
      Address.belongsTo(models.Customers, {
        onDelete: "cascade",
      });
      Address.hasMany(models.Orderline, {
        onDelete: "cascade",
      });
    };
    return Address;
  };