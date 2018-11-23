/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');
    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                // Use controller function
                const { miss, extra, ok } = checkFields(['first_name', 'last_name', 'email','password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
                register(req.body)
                    .then( apiRes =>  sendApiSuccessResponse(res, 'Register success', apiRes))
                    .catch( apiErr => sendApiErrorResponse(res, 'Register fails', apiErr));
            });

            // Login
            authRouter.post('/login', (req, res) => {
                // Use controller function
                const { miss, extra, ok } = checkFields(['email','password'], req.body);
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
                login(req.body)
                    .then( apiRes =>  sendApiSuccessResponse(res, 'login success', apiRes))
                    .catch( apiErr => sendApiErrorResponse(res, 'login fails', apiErr));
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//