import * as transactionModel from '../models/transactionModel.js';

// Add a new transaction
const addTransaction = async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    try {
        await transactionModel.createTransaction({ type, category, amount, date, description });
        res.status(201).send('Transaction added successfully');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error adding transaction');
    }
};

// Get a list of transactions with pagination
const getTransactions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const transactions = await transactionModel.getTransactions(page, limit);
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving transactions');
    }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;

    try {
        await transactionModel.updateTransaction(id, { type, category, amount, date, description });
        res.send('Transaction updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating transaction');
    }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        await transactionModel.deleteTransaction(id);
        res.send('Transaction deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting transaction');
    }
};

// Get a summary of transactions
const getSummary = async (req, res) => {
    try {
        const summary = await transactionModel.getSummary();
        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving summary');
    }
};

// Get monthly reports
const getMonthlyReports = async (req, res) => {
    try {
        const reports = await transactionModel.getMonthlyReports();
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving monthly reports');
    }
};

export {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary,
    getMonthlyReports,
};
