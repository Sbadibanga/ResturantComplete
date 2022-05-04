// customer table written using sequlieze syntax
module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        default: '0',
      }
    });
    Customers.associate = (models) => {
      Customers.hasMany(models.Address, {
        onDelete: "cascade",
      });
  
      Customers.hasMany(models.Orderline, {
        onDelete: "cascade",
      });
    };
  
    return Customers;
  };