"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Payments", {
			id_payment: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			method: {
				type: Sequelize.STRING,
			},
			amount: {
				type: Sequelize.INTEGER,
			},
			paymentDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			id_reservation: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Reservations",
					key: "id_reservation",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Payments");
	},
};
