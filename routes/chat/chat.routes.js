/*
Imports
*/
    const express = require('express');
    const chatRouter = express.Router({ mergeParams: true });
    const { addMessage, deleteMessage, editMessage } = require('./chat.controller');
    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

/*
Routes definition
*/
class ChatRouterClass {
    routes(){
        // HATEOAS
        chatRouter.get('/', (req, res) => {
            res.json('HATEOAS for auth');
        });

        // Register
        chatRouter.post('/send', (req, res) => {
            // Use controller function
            const { miss, extra, ok } = checkFields(['emailAuthor', 'content'], req.body);
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
            addMessage(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Message écrit', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Message rejetée', apiErr));
        });
        chatRouter.post('/delete', (req, res) => {
            // Use controller function
            const { miss, extra, ok } = checkFields(['_idMessage','email'], req.body);
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
            deleteMessage(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'Deleted', apiRes))
                .catch( apiErr => sendApiErrorResponse(res, 'Fails delete', apiErr));
        });

        chatRouter.post('/edit', (req, res) => {
            // Use controller function
            const { miss, extra, ok } = checkFields(['_idMessage','email','newContent'], req.body);
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
            editMessage(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'modifier', apiRes))
            .catch( apiErr => sendApiErrorResponse(res, 'erreur de modification', apiErr));
        });
    };

    init(){
        this.routes();
        return chatRouter;
    }
}
//

/*
Export
*/
module.exports = ChatRouterClass;
//