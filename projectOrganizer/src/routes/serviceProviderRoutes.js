const express = require('express')
const router = express.Router()
const serviceProviderController =   require('../controllers/serviceProviderController');
// Retrieve all clients
router.get('/', serviceProviderController.findAll);
// Create a new client
router.post('/', serviceProviderController.create);
// Retrieve a single client with id
router.get('/:id', serviceProviderController.findById);
// Update a client with id
router.put('/:id', serviceProviderController.update);
// Delete a client with id
router.delete('/:id', serviceProviderController.delete);
module.exports = router