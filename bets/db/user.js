"use strict";

const { DataTypes } = require(`sequelize`);
const { sequelize } = require(`.`);

const User = sequelize.define(`User`, {
  username: { type: DataTypes.STRING, unique: true },
  fullName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN },
});

exports.User = User;
