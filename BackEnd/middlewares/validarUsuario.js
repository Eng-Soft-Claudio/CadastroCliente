const usuarioSchema = require('../validations/usuarioValidation');
const handleValidation = require('../utils/handleValidation');

const validarUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return handleValidation(res, error);
  }

  next();
};

module.exports = validarUsuario;
