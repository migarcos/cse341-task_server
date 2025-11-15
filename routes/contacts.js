const express = require('express');
const router = express.Router();
const { validationResult } = require("express-validator");
const contactsController = require('../controllers/contacts');
const  { validateContact } = require('../middleware/validator');
const validation = require('../middleware/validate');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getSingle);

// router.post('/contacts/', contactsController.createContact);
router.post('/contacts/', validateContact, async (req, res) => {
    // #swagger.tags = ['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return contactsController.createContact(req, res);
});

router.put('/contacts/:id', validation.saveContact, contactsController.replaceContact);

router.delete('/contacts/:id', contactsController.deleteContact);
module.exports =  router ;
