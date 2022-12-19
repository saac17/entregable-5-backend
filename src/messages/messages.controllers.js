const Messages = require('../models/messages.models')
const uuid = require('uuid')


const findAllMessageByConversationId = async (conversationId) => {
    const data = await Messages.findAll({
        where:{
            conversationId
        }
    })
    return data
}

const findMessageById = async (id, conversationId) => {
    const data = await Messages.findOne({
        where: {
            id,
            conversationId
        }
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const destroyMessageById = async(id) =>{
    const data = await Messages.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    findAllMessageByConversationId,
    findMessageById,
    createMessage,
    destroyMessageById
}
