const Usuario = require('../models/Usuario');

exports.buscarTodosUsuarios = async () => {
  return await Usuario.find();
};

exports.salvarUsuario = async (dados) => {
  const usuario = new Usuario(dados);
  return await usuario.save();
};
