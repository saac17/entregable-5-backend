const bd = require('../utils/database')

const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)
    //? c. Un usuario tiene o envia muchos mensajes
    Users.hasMany(Messages)
    Messages.belongsTo(Users)
    //? a. Un usuario tiene muchas conversaciones
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)
    //? Un participantes solo tiene un usuario
    Users.hasOne(Participants)
    Participants.belongsTo(Users)
    //? b. & d. Una conversacion tiene muchos participantes
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
    //? e. Una conversacion tiene muchos mensajes
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

}

const initTrigger = () => {
    
    // Se ejecuta una sola vez, si usas nodemon debes comentar esta funcion en app.js
    return bd.query(
        `create or replace function init_Participants() returns trigger as
        $$
        begin 
            insert into participants values(uuid_generate_v4(), NEW."userId", new."id", current_date, current_date);
        for i in array_lower(NEW."initParticipants",1)..array_upper(NEW."initParticipants",1) 
            loop 
                insert into participants values(uuid_generate_v4(), NEW."initParticipants"[i], new."id", current_date, current_date);
                
            end loop;
            return new;
        end
        $$
        language 'plpgsql' volatile;
        create trigger TR_init_participants after insert on conversations for each row
        execute procedure init_Participants();

        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    )
}


module.exports = {
    initModels,
    initTrigger
}