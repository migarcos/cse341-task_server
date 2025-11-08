const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const result = await mongodb.getDatabase().db().collection('contact').find();
    result.toArray().then( (contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['Contacts']
    const userId =  new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contact').find({ _id: userId});
    result.toArray().then( (contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const createContact = async(req, res) => {
      // #swagger.tags = ['Contacts']
    try {
        const contact = {
            firstName: req.body.firstName,
            lastname: req.body.lastname,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb
        .getDatabase()
        .db()
        .collection('contact')
        .insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Contact created successfully', id: response.insertedId });
        } else {
            res.status(400).json({ error: 'Failed to create contact' });
        }
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    // const contact = {
    //     firstName : req.body.firstName,
    //     lastname : req.body.lastname,
    //     email : req.body.email,
    //     favoriteColor : req.body.favoriteColor,
    //     birthday : req.body.birthday
    // };
    // const response = await mongodb.getDatabase().db().collection('contact').insertOne(contact);
    // if (response.acknowledged) {
    //     res.status(204).send;
    // } else {
    //     res.status(500).json( response.Error || 'Some error ocurre updating contact');
    // }
};

const updateContact = async(req, res) => {
    // #swagger.tags = ['Contacts']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName : req.body.firstName,
        lastname : req.body.lastname,
        email : req.body.email,
        favoriteColor : req.body.favoriteColor,
        birthday : req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contact').updateOne( { _id: userId }, { $set: contact });
    if (response.modifiedCount > 0) {
        res.status(204).send;
    } else {
        res.status(500).json( response.Error || 'Some error ocurre updating contact');
    }
};

const replaceContact = async(req, res) => {
    // #swagger.tags = ['Contacts']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName : req.body.firstName,
        lastname : req.body.lastname,
        email : req.body.email,
        favoriteColor : req.body.favoriteColor,
        birthday : req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contact').replaceOne( { _id: userId }, contact );
    if (response.modifiedCount > 0) {
        res.status(204).send;
    } else {
        res.status(500).json( response.Error || 'Some error ocurre updating contact');
    }
};

const deleteContact = async(req, res) => {
    // #swagger.tags = ['Contacts']
    // const userId = new ObjectId(req.params.id);
    // const response = await mongodb.getDatabase().db().collection('contact').deleteOne( { _id: userId}, true);
    // if (response.deletedCount > 0) {
    //     res.status(204).send;
    // } else {
    //     res.status(500).json( response.Error || 'Some error ocurre updating contact');
    // }
    try {
        const userId = new ObjectId(req.params.id);

        const response = await mongodb
        .getDatabase()
        .db()
        .collection('contact')
        .deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
        res.status(204).send(); 
        } else {
        res.status(404).json({ error: 'Contact not found or already deleted' });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { 
    getAll,
    getSingle,
    createContact,
    updateContact,
    replaceContact,
    deleteContact
};