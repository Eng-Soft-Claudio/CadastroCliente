const handleValidation = (res, error) => {
    const erros = error.details.map(detail => detail.message);
    res.status(400).json({ erro: 'Validação falhou', detalhes: erros });
  };
  
  module.exports = handleValidation;
  