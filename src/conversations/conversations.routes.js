const router = require('express').Router()
const conversationServices = require('./conversations.services')
const messageService = require('../messages/messages.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantValidate = require('../middlewares/participantValidate.middleware')

router.route("/")
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt',{session: false}), participantValidate, messageService.getAllMessageByConversation)  
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageService.postMessage)
    
router.route('/:conversation_id/messages/:message_id')
.get(passportJWT.authenticate('jwt',{session: false}), participantValidate, messageService.getMessageById)
.delete(passportJWT.authenticate('jwt',{session: false}), participantValidate, messageService.deleteMessageById)    
    
module.exports = router