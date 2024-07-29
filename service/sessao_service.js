const sessaoRepository = require('../repository/sessao_repository_db');

async function listarSessoes() {
    try {
        return await sessaoRepository.listar();
    } catch (err) {
        throw { id: 500, message: err.message };
    }
}

async function inserir(sessao) {
    if (sessao && sessao.filme_id && sessao.horario && sessao.sala) {
        try {
            return await sessaoRepository.inserir(sessao);
        } catch (err) {
            throw { id: 500, message: err.message };
        }
    } else {
        throw { id: 400, message: "Sessão não possui título do filme, horário ou sala" };
    }
}

async function buscarPorId(id) {
    try {
        const sessao = await sessaoRepository.buscarPorId(id);
        if (sessao) {
            return sessao;
        } else {
            throw { id: 404, message: "Sessão não encontrada" };
        }
    } catch (err) {
        throw { id: 500, message: err.message };
    }
}

async function atualizar(id, sessao) {
    if (sessao && sessao.filme_id && sessao.horario && sessao.sala) {
        try {
            const sessaoAtualizada = await sessaoRepository.atualizar(id, sessao);
            if (sessaoAtualizada) {
                return sessaoAtualizada;
            } else {
                throw { id: 404, message: "Sessão não encontrada" };
            }
        } catch (err) {
            throw { id: 500, message: err.message };
        }
    } else {
        throw { id: 400, message: "Sessão não possui título do filme, horário ou sala" };
    }
}

async function deletar(id) {
    try {
        const sessaoDeletada = await sessaoRepository.deletar(id);
        if (sessaoDeletada) {
            return sessaoDeletada;
        } else {
            throw { id: 404, message: "Sessão não encontrada" };
        }
    } catch (err) {
        throw { id: 500, message: err.message };
    }
}

module.exports = {
    listarSessoes,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
