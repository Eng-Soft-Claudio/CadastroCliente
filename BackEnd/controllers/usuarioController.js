const Usuario = require('../models/Usuario');

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Removendo _id se enviado por engano no corpo
    if ('_id' in req.body) {
      delete req.body._id;
    }

    const dadosAtualizados = req.body;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dadosAtualizados, {
      new: true,
      runValidators: true
    });

    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await Usuario.findByIdAndDelete(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir usuário', detalhes: error.message });
  }
};
