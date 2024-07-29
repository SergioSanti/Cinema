const filmeService = require('../service/filme_service');

async function listar(req, res) {
    try {
        res.json(await filmeService.listarFilmes());
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }            
}

async function inserir(req, res) {
    let filme = req.body;
    
    try {
        const filmeInserido = await filmeService.inserirFilme(filme);
        res.status(201).json(filmeInserido);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }    
}

async function buscarPorId(req, res) {
    const id = +req.params.id;    
    try {
        const filmeComId = await filmeService.buscarFilmePorId(id);
        res.json(filmeComId);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }        
}

async function atualizar(req, res) {
    let filme = req.body;
    const id = +req.params.id;
    try {
        const filmeAtualizado = await filmeService.atualizarFilme(id, filme);
        res.json(filmeAtualizado);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const filmeDeletado = await filmeService.deletarFilme(id);
        res.json(filmeDeletado);        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }        
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
