import express from 'express';
import inventoryController from '../api/controllers/inventory.controller';

export const router = express.Router();

// Invoices
router.get('/inventory', inventoryController.findAll);
router.get('/inventory/:id', inventoryController.findOne);
router.delete('/inventory/:id', inventoryController.delete);
router.put('/inventory/:id', inventoryController.update);
router.post('/inventory', inventoryController.create);
