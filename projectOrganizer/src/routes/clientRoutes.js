const express = require('express')
const router = express.Router()
const clientController =   require('../controllers/clientController');
// Retrieve all clients
router.get('/', clientController.findAll);
// Create a new client
router.post('/', clientController.create);
// Retrieve a single client with id
router.get('/:id', clientController.findById);
// Update a client with id
router.put('/:id', clientController.update);
// Delete a client with id
router.delete('/:id', clientController.delete);
module.exports = router