"use strict";

const { compare } = require(`bcrypt`);
const { User } = require(`../db/user`);

/**
 * Authenticate user.
 *
 * @type {import("express").RequestHandler}
 */
exports.login = async (req, res, next) => {
  // Get and validate user
  const user = await User.findOne({ where: { username: req.body.username }});
  if (user === null) {
    return next({ code: 404, msg: `not found`});
  }

  // Authenticate user
  const valid = await compare(req.body.password, user.password);
  if (!valid) {
    return next({ code: 401, msg: `not valid username or password` });
  }

  // Update session
  req.session.userId = user.id;

  // Send user information
  user.password = undefined;
  res.send(user);
};

/**
 * Close session.
 *
 * @type {import(`express`).RequestHandler}
 */
exports.logout = (req, res) => {
  req.session.destroy();
  res.send({ msg: `session closed` });
};
