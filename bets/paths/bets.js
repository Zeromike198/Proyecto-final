"use strict";

const { Bet } = require(`../db/bet`);

/**
 * List bets.
 *
 * @type {import("express").RequestHandler}
 */
exports.listBets = async (req, res) => {
  try {
    // Get list of bets and returns it
    const bets = await Bet.findAll();
    res.send(bets);
  }
  catch(err) {
    next({ code: 500, msg: err.message });
  }
};

/**
 * Get bet.
 *
 * @type {import("express").RequestHandler}
 */
exports.getBet = async (req, res, next) => {
  try {
    // Get and validate bet
    const bet = await Bet.findByPk(req.params.id);

    if (bet === null) {
      return next({ code: 404, msg: `bet not found` });
    }

    // Return bet
    res.send(bet);
  }
  catch(err) {
    next({ code: 500, msg: err.message });
  }
};

/**
 * Create a new bet.
 *
 * @type {import("express").RequestHandler}
 */
exports.createBet = async (req, res, next) => {
  try {
    // Insert new bet
    const bet = await Bet.create({
      name: req.body.name,
      price: req.body.price,
    });

    // Return inserted bet
    res.send(bet);
  }
  catch(err) {
    next({ code: 500, msg: err.message });
  }
};

/**
 * Update bet.
 *
 * @type {import("express").RequestHandler}
 */
exports.updateBet = async (req, res, next) => {
  try {
    // Get and validate bet
    const bet = await Bet.findByPk(req.params.id);

    if (bet === null) {
      return next({ code: 404, msg: `bet not found` });
    }

    // Update bet
    bet.set(`name`, req.body.name);
    bet.set(`price`, req.body.price);
    await bet.save();

    // Return bet
    res.send(bet);
  }
  catch(err) {
    next({ code: 500, msg: err.message });
  }
};

/**
 * Delete bet.
 *
 * @type {import("express").RequestHandler}
 */
exports.deleteBet = async (req, res, next) => {
  try {
    // Validate bet
    const bet = await Bet.findByPk(req.params.id);

    if (bet === null) {
      return next({ code: 404, msg: `bet not found` });
    }

    // Delete and return bet
    bet.destroy();
    res.send(bet);
  }
  catch(err) {
    next({ code: 500, msg: err.message });
  }
};
