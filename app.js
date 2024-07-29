const express = require('express');
const app = express();
const PORTA = 3000;

const sessaoRouter = require('./rotas/sessao_rotas');

app.use(express.json()); 

app.use("/api/sessoes", sessaoRouter);

app.listen(PORTA, () => {
    console.log("Iniciando o servidor na porta " + PORTA);
});
