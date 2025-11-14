import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
  const uri = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/test';
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
    throw err;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
