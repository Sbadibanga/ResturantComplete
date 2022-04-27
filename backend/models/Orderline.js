module.exports = (sequelize, DataTypes) => {
    const Orderline = sequelize.define("Orderline", {
      totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      itemsPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      shippingPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      taxPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      isPaid:{
        type: DataTypes.BOOLEAN,
        default: '0',
      },
      isDelivered:{
        type: DataTypes.BOOLEAN,
        default: '0',
      },
    });

    Orderline.associate = (models) => {
        Orderline.belongsTo(models.Customers, {
          onDelete: "cascade",
        });
        Orderline.belongsTo(models.Address, {
          onDelete: "cascade",
        });
      }
    return Orderline;
  };