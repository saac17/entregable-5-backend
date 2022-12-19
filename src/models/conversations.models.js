const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models') 

const Conversations = db.define('conversations', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    },
    initParticipants:{
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING
    },
})

module.exports = Conversations