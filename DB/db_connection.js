import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_SERVER);
    console.log('Database connected successfully ....');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};