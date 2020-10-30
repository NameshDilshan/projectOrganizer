const express = require('express')
const router = express.Router()
const clientController =   require('../controllers/clientController');
// Retrieve all clients
router.get('/', clientController.findAll);
// Create a new client
router.post('/', clientController.create);
// Retrieve a single client with id
router.get('/:googleId', clientController.findById);
// Update a client with id
router.put('/:googleId', clientController.update);
// Delete a client with id
router.delete('/:googleId', clientController.delete);
module.exports = router