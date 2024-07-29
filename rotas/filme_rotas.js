const express = require('express')
const router = express.Router();

const filmeController = require('../controller/filme_controller');

//router: /produtos
router.get("/", filmeController.listar);
router.post("/", filmeController.inserir);
router.get("/:id", filmeController.buscarPorId);
router.put("/:id", filmeController.atualizar);
router.delete("/:id", filmeController.deletar);

module.exports = router;