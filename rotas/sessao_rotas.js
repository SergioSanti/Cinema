const express = require('express');
const router = express.Router();
const sessaoController = require('../controller/sessao_controller');

// Rotas para sessões
router.get('/', sessaoController.listar);
router.post('/', sessaoController.inserir);
router.get('/:id', sessaoController.buscarPorId);
router.put('/:id', sessaoController.atualizar);
router.delete('/:id', sessaoController.deletar);

module.exports = router;
