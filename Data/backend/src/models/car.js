"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Car extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Car.belongsTo(models.User, { foreignKey: "id_user" });
		}
	}
	Car.init(
		{
			id_car: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			license_plate: DataTypes.STRING,
			type: DataTypes.STRING,
			inTime: DataTypes.DATE,
			outTime: DataTypes.DATE,
			id_user: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Car",
		}
	);
	return Car;
};
