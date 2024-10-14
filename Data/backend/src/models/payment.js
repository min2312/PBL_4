"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Payment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Payment.belongsTo(models.Reservation, { foreignKey: "id_reservation" });
		}
	}
	Payment.init(
		{
			id_payment: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			method: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			paymentDate: DataTypes.DATE,
			id_reservation: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Payment",
		}
	);
	return Payment;
};
