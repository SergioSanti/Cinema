const sessaoService = require('../service/sessao_service');

async function listar(req, res) {
    try {
        res.json(await sessaoService.listar());
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function inserir(req, res) {
    let sessao = req.body;
    
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
        const sessaoComId = await sessaoService.buscarPorId(id);
        res.json(sessaoComId);
    } catch (err) {
        res.status(err.id).json(err);
    }
}

async function atualizar(req, res) {
    let sessao = req.body;
    const id = +req.params.id;
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
