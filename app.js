import express from 'express';
import initializeDb from './src/db/db.js'; 
import userRoutes from './src/routes/userRoutes.js'; 
import transactionRoutes from './src/routes/transactionRoutes.js';

const app = express();
app.use(express.json());

// Set up routes
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
});

const startServer = async () => {
    await initializeDb();
    app.listen(3000, () => {
        console.log('Server Running at http://localhost:3000/');
    });
};

// Start the server
startServer();
