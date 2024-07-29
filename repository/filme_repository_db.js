const { Client } = require('pg');

const conexao = {
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "cinema_db"
}

async function listarFilmes() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query("SELECT * FROM filme");
    const listaFilmes = result.rows;
    await cliente.end();
    return listaFilmes;
}

async function inserirFilme(filme) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO filme(titulo, duracao, genero, classificacao) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [filme.titulo, filme.duracao, filme.genero, filme.classificacao];
    const result = await cliente.query(sql, values);
    const filmeInserido = result.rows[0];
    await cliente.end();
    return filmeInserido;
}

async function buscarFilmePorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT * FROM filme WHERE id = $1";
    const values = [id];
    const result = await cliente.query(sql, values);
    const filmeEncontrado = result.rows[0];
    await cliente.end();
    return filmeEncontrado;
}

async function atualizarFilme(id, filme) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "UPDATE filme SET titulo = $1, duracao = $2, genero = $3, classificacao = $4 WHERE id = $5 RETURNING *";
    const values = [filme.titulo, filme.duracao, filme.genero, filme.classificacao, id];
    const result = await cliente.query(sql, values);
    const filmeAtualizado = result.rows[0];
    await cliente.end();
    return filmeAtualizado;
}

async function deletarFilme(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "DELETE FROM filme WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await cliente.query(sql, values);
    const filmeDeletado = result.rows[0];
    await cliente.end();
    return filmeDeletado;
}

module.exports = {
    listarFilmes,
    inserirFilme,
    buscarFilmePorId,
    atualizarFilme,
    deletarFilme
}
