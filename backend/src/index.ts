import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import userRoutes from './routes/userRoutes';
import chatRoutes from './routes/chatRoutes';
import billingRoutes from './routes/billingRoutes';
import paymentRoutes from './routes/paymentRoutes';
import usageRoutes from './routes/usageRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/usage', usageRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/legal-buddy';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
