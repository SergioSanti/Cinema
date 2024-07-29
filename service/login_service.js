const jwt = require('jsonwebtoken');

const CHAVE_SECRETA = "Sergio@2024!";
const userAdmin = { 
    id: 1,
    nome: "Admin",
    usuario: "admin",
    senha: "12345"
}

function verificarLogin(user) {
    if(user && user.usuario == userAdmin.usuario
        && user.senha == userAdmin.senha)
    {
        const token = jwt.sign({id:userAdmin.id, nome:userAdmin.nome},
            CHAVE_SECRETA, { expiresIn: '1h' })
        return token;
    }
    
    throw {id:401, message:"Usuário ou senha inválidos"}; 

}

function verificarToken(token) {
    try{
        const payload = jwt.verify(token,CHAVE_SECRETA);
        if(payload) {
            return payload;
        }
        else {
            throw {id:501, message:"Token inválido"};
        }
    } catch(err) {
        throw {id:501, message:"Token inválido"};
    }
}


module.exports = {
    verificarLogin,
    verificarToken
}