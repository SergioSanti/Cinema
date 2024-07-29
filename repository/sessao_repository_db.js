const { Client } = require('pg');

const conexao = {
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "cinema_db"
};

// Função para listar todas as sessões
async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query("SELECT * FROM sessao");
    await cliente.end();
    return result.rows;
}

// Função para inserir uma nova sessão
async function inserir(sessao) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO sessao(filme_id, horario, sala) VALUES ($1, $2, $3) RETURNING *";
    const values = [sessao.filme_id, sessao.horario, sessao.sala];
    const result = await cliente.query(sql, values);
    await cliente.end();
    return result.rows[0];
}

// Função para buscar uma sessão por ID
async function buscarPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT * FROM sessao WHERE id=$1";
    const result = await cliente.query(sql, [id]);
    await cliente.end();
    return result.rows[0];
}

// Função para atualizar uma sessão
async function atualizar(id, sessao) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = 'UPDATE sessao SET filme_id=$1, horario=$2, sala=$3 WHERE id=$4 RETURNING *';
    const values = [sessao.filme_id, sessao.horario, sessao.sala, id];
    const result = await cliente.query(sql, values);
    await cliente.end();
    return result.rows[0];
}

// Função para deletar uma sessão
async function deletar(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = 'DELETE FROM sessao WHERE id=$1 RETURNING *';
    const result = await cliente.query(sql, [id]);
    await cliente.end();
    return result.rows[0];
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
