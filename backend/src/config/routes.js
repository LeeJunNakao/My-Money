const express = require('express');
const auth = require('./auth')

module.exports = function(server){
    
     /*
        Rotas protegidas
    */

    const protectedAPI = express.Router();
    server.use('/api', protectedAPI);

    protectedAPI.use(auth);

    const billingCycle = require('../api/billingCycle/billingCycleService');
    billingCycle.register(protectedAPI, '/billingCycles');

    /*
        Rotas abertas
    */

    const openApi = express.Router();
    server.use('/oapi',openApi);

    const AuthService = require('../api/user/AuthService');
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken);
}