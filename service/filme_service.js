const filmeRepository = require('../repository/filme_repository_db');

async function listar() {
    try {
        return await filmeRepository.listar();
    } catch (err) {
        throw { id: 500, message: err.message };
    }
}

async function inserir(filme) {
    if (filme && filme.titulo && filme.duracao && filme.genero && filme.classificacao) { // filme != undefined
        try {
            return await filmeRepository.inserir(filme);
        } catch (err) {
            throw { id: 500, message: err.message };
        }
    } else {
        throw { id: 400, message: "Filme não possui título, duração, gênero ou classificação" };
    }
}

async function buscarPorId(id) {
    let filme;
    try {
        filme = await filmeRepository.buscarPorId(id);
    } catch (err) {
        throw { id: 500, message: err.message };
    }

    if (filme) {
        return filme;
    } else {
        throw { id: 404, message: "Filme não encontrado" };
    }
}

async function atualizar(id, filme) {
    if (filme && filme.titulo && filme.duracao && filme.genero && filme.classificacao) { // filme != undefined
        let filmeAtualizado;
        try {
            filmeAtualizado = await filmeRepository.atualizar(id, filme);
        } catch (err) {
            throw { id: 500, message: err.message };
        }

        if (filmeAtualizado) {
            return filmeAtualizado;
        } else {
            throw { id: 404, message: "Filme não encontrado" };
        }
    } else {
        throw { id: 400, message: "Filme não possui título, duração, gênero ou classificação" };
    }
}

async function deletar(id) {
    let filmeDeletado;
    try {
        filmeDeletado = await filmeRepository.deletar(id);
    } catch (err) {
        throw { id: 500, message: err.message };
    }

    if (filmeDeletado) {
        return filmeDeletado;
    } else {
        throw { id: 404, message: "Filme não encontrado" };
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
