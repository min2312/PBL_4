"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Reservation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Reservation.belongsTo(models.User, { foreignKey: "id_user" });
			Reservation.belongsTo(models.Car, {
				foreignKey: "id_car",
			});
		}
	}
	Reservation.init(
		{
			id_reservation: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user: DataTypes.INTEGER,
			id_car: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			type: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Reservation",
		}
	);
	return Reservation;
};
