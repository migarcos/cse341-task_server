const router = require('express').Router();
const { validationResult } = require('express-validator');
const { validateContact } = require('./contactValidation');


router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    // #swagger.tags = ['Hello World']
    res.send('Hello World!')
});

router.get('/contacts', require('./contacts'));

module.exports = router;