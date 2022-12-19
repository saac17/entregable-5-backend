const messageControllers = require('./messages.controllers')


const getAllMessageByConversation = (req, res) => {
    const conversation_Id = req.params.conversation_id
    messageControllers.findAllMessageByConversationId(conversation_Id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(error=>res.status(400).json({message:error.message}))
}


const getMessageById = (req, res) => {
    const messageId = req.params.message_id
    const conversationId = req.params.conversation_id
    messageControllers.findMessageById(messageId, conversationId)
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: "INVALID ID"})
            }
        })
        .catch(error=>res.status(400).json({message:error.message}))
}

const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const {message} = req.body

    messageControllers.createMessage({userId, conversationId, message})
        .then(data=> {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                message: 'text'
            }})
        })
}

const deleteMessageById = (req, res) => {
    const messageId = req.params.message_id
    messageControllers.destroyMessageById(messageId)
        .then(data=>{
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({message: "INVALID ID"})
            }
        })
        .catch(error=>res.status(400).json({message:error.message}))
}

module.exports = {
    getAllMessageByConversation,
    getMessageById,
    postMessage,
    deleteMessageById
}