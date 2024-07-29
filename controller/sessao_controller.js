const sessaoService = require('../service/sessao_service');

async function listar(req, res) {
    try {
        const sessoes = await sessaoService.listarSessoes();
        res.json(sessoes);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function inserir(req, res) {
    const sessao = req.body;
    try {
        const sessaoInserida = await sessaoService.inserir(sessao);
        res.status(201).json(sessaoInserida);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const sessao = await sessaoService.buscarPorId(id);
        res.json(sessao);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    const sessao = req.body;
    try {
        const sessaoAtualizada = await sessaoService.atualizar(id, sessao);
        res.json(sessaoAtualizada);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const sessaoDeletada = await sessaoService.deletar(id);
        res.json(sessaoDeletada);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
