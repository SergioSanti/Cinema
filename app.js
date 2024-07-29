const express = require('express');
const app = express();
const PORTA = 3000;

const sessaoRouter = require('./rotas/sessao_rotas');
const loginController = require('./controller/login_controller');
const middlewareAcesso = require('./middleware/acesso_middleware');

app.use(express.json()); 

app.use((req, res, next) => {
    console.log(req.method+" "+req.originalUrl);
    next();
})

app.post("/api/login", loginController.realizarLogin);

app.use("/api/sessoes", middlewareAcesso.verificarAcesso, sessaoRouter);

app.listen(PORTA, () => {
    console.log("Iniciando o servidor na porta " + PORTA);
});
