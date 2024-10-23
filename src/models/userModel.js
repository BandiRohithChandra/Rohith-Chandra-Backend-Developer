import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'userData.db');

const getDb = async () => {
    return open({ filename: dbPath, driver: sqlite3.Database });
};

const createUser = async (user) => {
    const db = await getDb();
    const { username, name, password, gender, location } = user;
    await db.run('INSERT INTO user (username, name, password, gender, location) VALUES (?, ?, ?, ?, ?)', 
        [username, name, password, gender, location]);
};

const getUserByUsername = async (username) => {
    const db = await getDb();
    return await db.get('SELECT * FROM user WHERE username = ?', [username]);
};

const changePassword = async (username, newPassword) => {
    const db = await getDb();
    await db.run('UPDATE user SET password = ? WHERE username = ?', [newPassword, username]);
};

export {
    createUser,
    getUserByUsername,
    changePassword, // Export the changePassword function
};
