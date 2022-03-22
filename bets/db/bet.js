"use strict";

const { DataTypes } = require(`sequelize`);
const { sequelize } = require(`.`);

const Bet = sequelize.define(`Bet`, {
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT }
});

exports.Bet = Bet;
