const uuid = require('uuid')
const sequelize = require('sequelize')

const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')
const Participants = require('../models/participants.models')


const findAllConversations = async (userId) => {
    const data = await Conversations.findAll({
        attributes: {
            exclude: ['userId', 'initParticipants', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Participants,
                attributes: {
                    exclude: ['userId', 'conversationId', 'createdAt', 'updatedAt']
                },
                include:[
                    {
                        model: Users,
                        attributes: {
                            exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt']
                        }
                        
                    }
                ]
            }
        ],
        where:{
            userId
        }
    })
    return data
}

const findConversationById = async (conversation_id) => {
    const data = await Conversations.findOne({
        attributes: {
            exclude: ['userId', 'initParticipants', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Participants,
                attributes: {
                    exclude: ['userId', 'conversationId', 'createdAt', 'updatedAt']
                },
                include:[
                    {
                        model: Users,
                        attributes: {
                            exclude: ['email', 'password', 'role', 'createdAt', 'updatedAt']
                        }
                        
                    }
                ]
            }
        ],
        where: {
            id : conversation_id
        }
    })
    return data
}

const createConversation = async (obj) => {
    const data = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        userId : obj.userId,
        imageUrl: obj.imageUrl,
        initParticipants: sequelize.literal(`ARRAY${obj.initParticipants}::uuid[]`)
    })

    return data
}

//Se necesita un patch y un delete
const updateConversation = async (conversation_id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: conversation_id
        }
    })
    return data[0]
}

const deleteConversation = async (conversation_id) => {
    const data = await Conversations.destroy({
        where: {
            id : conversation_id
        }
    })
    return data
}


module.exports = {
    findAllConversations,
    findConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}


