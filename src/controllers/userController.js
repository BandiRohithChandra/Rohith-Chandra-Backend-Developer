import * as userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const { username, name, password, gender, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await userModel.createUser({ username, name, password: hashedPassword, gender, location });
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send('User already exists');
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.getUserByUsername(username);
    
    if (!user) {
        return res.status(400).send('Invalid user');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret');

        res.json({ token });
    } else {
        res.status(400).send('Invalid password');
    }
};

const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = await userModel.getUserByUsername(username);

    if (!user) {
        return res.status(400).send('User not registered');
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (isValidPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.changePassword(username, hashedPassword);
        res.send('Password updated successfully');
    } else {
        res.status(400).send('Invalid current password');
    }
};

export  {
    registerUser,
    loginUser,
    changePassword,
};
