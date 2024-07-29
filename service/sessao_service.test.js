const service = require('./sessao_service');


test('buscar por id deve retornar indefinido', () => {

    expect(() => service.buscarPorId(10)).toThrow();
    
});