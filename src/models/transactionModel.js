import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'userData.db');

const getDb = async () => {
    return open({ filename: dbPath, driver: sqlite3.Database });
};

const createTransaction = async (transaction) => {
    const db = await getDb();
    const { type, category, amount, date, description } = transaction;
    await db.run('INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)', 
        [type, category, amount, date, description]);
};

const getTransactions = async (page, limit) => {
    const db = await getDb();
    return await db.all('SELECT * FROM transactions LIMIT ? OFFSET ?', [limit, (page - 1) * limit]);
};

const updateTransaction = async (id, transaction) => {
    const db = await getDb();
    const { type, category, amount, date, description } = transaction;
    await db.run('UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?', 
        [type, category, amount, date, description, id]);
};

const deleteTransaction = async (id) => {
    const db = await getDb();
    await db.run('DELETE FROM transactions WHERE id = ?', [id]);
};

export {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
};
