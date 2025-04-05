const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validarUsuario = require('../middlewares/validarUsuario');

router.post('/', validarUsuario, usuarioController.criarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.put('/:id', validarUsuario, usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
