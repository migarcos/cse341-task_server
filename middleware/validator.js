const {body} = require("express-validator");

const validateContact = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isString().withMessage('First name must be a string'),

  body('lastname')
    .notEmpty().withMessage('Last name is required')
    .isString().withMessage('Last name must be a string'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

  body('favoriteColor')
    .optional()
    .isString().withMessage('Favorite color must be a string'),

  body('birthday')
    .notEmpty().withMessage('Birthday is required')
    .isISO8601().withMessage('Birthday must be a valid date')
];

module.exports = { validateContact }