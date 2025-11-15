const valid  = require('validatorjs');

const validator = (body, rules, customMessages, callback) =>{
    const validation = new valid(body, rules, customMessages);
    validation.passes( () => callback(null, true) );
    validation.fails( () => callback( validation.errors, false) );
};

module.exports = validator;