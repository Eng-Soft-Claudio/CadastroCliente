const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('MongoDB conectado com sucesso ✅');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB ❌:', err);
  }
};

module.exports = connectDB;
