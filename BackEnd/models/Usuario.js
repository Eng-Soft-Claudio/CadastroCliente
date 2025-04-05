// models/Usuario.js
const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema({
  rua: String,
  numero: String,
  cidade: String,
  estado: String,
  cep: String
});

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  cpf: { type: String, required: true },
  endereco: EnderecoSchema
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
