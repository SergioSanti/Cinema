const { Client } = require('pg');
const conexao = {
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "cinema_db"
};

async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query(`
        SELECT sessoao.id, sessao.filme_id, filme.titulo, sessao.horario, sessao.sala
        FROM sessoao
        JOIN filmes ON sessao.filme_id = filmes.id
    `);
    const listaSessoes = result.rows;   
    await cliente.end();
    return listaSessoes;
}

async function inserir(sessao) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO sessao (filme_id, horario, sala) VALUES ($1, $2, $3) RETURNING id, filme_id, horario, sala";
    const values = [sessao.filme_id, sessao.horario, sessao.sala];
    const result = await cliente.query(sql, values);
    const sessaoInserida = result.rows[0];
    
    // Adiciona o título do filme no resultado retornado
    const filmeResult = await cliente.query("SELECT titulo FROM filme WHERE id = $1", [sessaoInserida.filme_id]);
    sessaoInserida.titulo = filmeResult.rows[0].titulo;

    await cliente.end();
    return sessaoInserida;
}

async function buscarPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = `
        SELECT sessao.id, sessao.filme_id, filmes.titulo, sessao.horario, sessao.sala
        FROM sessao
        JOIN filmes ON sessao.filme_id = filmes.id
        WHERE sessao.id = $1
    `;
    const values = [id];
    const result = await cliente.query(sql, values);
    const sessaoEncontrada = result.rows[0];
    await cliente.end();
    return sessaoEncontrada;
}

async function atualizar(id, sessao) {
    const sql = 'UPDATE sessao SET filme_id=$1, horario=$2, sala=$3 WHERE id=$4 RETURNING id, filme_id, horario, sala';
    const values = [sessao.filme_id, sessao.horario, sessao.sala, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    const sessaoAtualizada = result.rows[0];

    // Adiciona o título do filme no resultado retornado
    if (sessaoAtualizada) {
        const filmeResult = await cliente.query("SELECT titulo FROM filme WHERE id = $1", [sessaoAtualizada.filme_id]);
        sessaoAtualizada.titulo = filmeResult.rows[0].titulo;
    }

    await cliente.end();
    return sessaoAtualizada;
}

async function deletar(id) {
    const sql = 'DELETE FROM sessao WHERE id=$1 RETURNING id, filme_id, horario, sala';
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    const sessaoDeletada = result.rows[0];

    // Adiciona o título do filme no resultado retornado
    if (sessaoDeletada) {
        const filmeResult = await cliente.query("SELECT titulo FROM filme WHERE id = $1", [sessaoDeletada.filme_id]);
        sessaoDeletada.titulo = filmeResult.rows[0].titulo;
    }

    await cliente.end();
    return sessaoDeletada;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
