const { hash } = require(`bcrypt`);
const { sequelize } = require("../db");
const { Bet } = require(`../db/bet`);
const { User } = require(`../db/user`);

/**
 * Insert the dafault data to the database.
 */
const seed = async () => {
  // Setup data
  sequelize.sync();
  const password = `secretpass`;

  // Create the admin user
  await User.create({
    username: `admin`,
    fullName: `Administrator`,
    password: await hash(password, 10),
    admin: true,
  });

  // Create default user
  await User.create({
    username: `user`,
    fullName: `User`,
    password: await hash(password, 10),
    admin: false,
  });

  // Create one bet
  await Bet.create({
    name: `Bet`,
    price: 10
  });

  // Close connection
  await sequelize.close();
};

seed();
