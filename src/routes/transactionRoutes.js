import express from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = express.Router();

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.post('/', asyncHandler(transactionController.addTransaction));
router.get('/', asyncHandler(transactionController.getTransactions));
router.get('/:id', asyncHandler(transactionController.getTransactionById));
router.put('/:id', asyncHandler(transactionController.updateTransaction));
router.delete('/:id', asyncHandler(transactionController.deleteTransaction));
router.get('/summary', asyncHandler(transactionController.getSummary));

export default router;
