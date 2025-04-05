// validations/usuarioValidation.js
const Joi = require('joi');

const enderecoSchema = Joi.object({
  rua: Joi.string().required(),
  numero: Joi.string().required(),
  cidade: Joi.string().required(),
  estado: Joi.string().required(),
  cep: Joi.string().required()
});

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().required(),
  cpf: Joi.string().required(),
  endereco: enderecoSchema.required()
});

module.exports = usuarioSchema;
