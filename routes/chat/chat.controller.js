/*
Import
*/
const MessageModel = require('../../models/message.model');
const UserModel = require('../../models/user.model');
//

/*
Functions
*/
const addMessage = body => {
    // Search for user
    return new Promise( (resolve, reject) => {

        UserModel.findOne({ email: body.emailAuthor }, (error, user) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(user){ // User already exist
                body.dateCrea = new Date();
                MessageModel.create(body, (error, newMessage) => {
                    if(error){ // Mongo error
                        return reject(error)
                    }
                    else{ // User registrated
                        return resolve(newMessage);
                    };
                });
            }
            else{
                return reject('not found')
            }
        });
    });
};

const deleteMessage = body => {
    // Search for user
    return new Promise( (resolve, reject) => {

        MessageModel.findOne({ _id: body._idMessage }, (error, message) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(message){ // User already exist
                if (message.emailAuthor == body.email)
                {
                    MessageModel.deleteOne({ size: body._idMessag},(error) => {
                        if(error){ // Mongo error
                            return reject(error)
                        }
                        else{
                            return resolve("ok");
                        };
                    });
                }
            }
            else{
                return reject('not found')
            }
        });
    });
};


const editMessage = body => {
    // Search for user
    return new Promise( (resolve, reject) => {

        MessageModel.findOne({ _id: body._idMessage }, (error, message) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(message){ // User already exist
                if (message.emailAuthor == body.email) {
                    MessageModel.updateOne({_id: body._idMessage}, {content: body.newContent}, function (err, res) {
                        if (error) { // Mongo error
                            return reject(error)
                        }
                        else {
                            MessageModel.findOne({_id: body._idMessage}, (error, message) => {
                                if (error) { // Mongo Error
                                    return reject(error)
                                }
                                else if (message) { // User already exist
                                    return reject(message)
                                }
                                else {
                                    return reject('not found')
                                }
                            });
                        }
                    });
                }
            }
            else{
                return reject('not found')
            }
        });
    });
};
//

/*
Export
*/
module.exports = {
    addMessage,
    deleteMessage,
    editMessage
};
//