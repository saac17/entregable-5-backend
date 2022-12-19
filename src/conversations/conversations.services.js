const conversationControllers = require("./conversations.controllers");

const getAllConversations = (req, res) => {
  conversationControllers.findAllConversations(req.user.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getConversationById = (req, res) => {
  const conversation_id = req.params.conversation_id;
  conversationControllers.findConversationById(conversation_id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "INVALID ID" });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};

const postConversation = (req, res) => {
  const { title, initParticipants, imageUrl } = req.body
  const userId = req.user.id
  conversationControllers.createConversation({ title, userId, initParticipants, imageUrl })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message
      })
    })
};

const patchConversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  const { title } = req.body;
  conversationControllers.updateConversation(conversationId, {title})
    .then((data) => {
      if (data) {
        res.status(200).json({ message: "Conversation Update Successfully!" });
      } else {
        res.status(404).json({
            message: `INVALID ID`,
          });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};

const deleteConversation = (req, res) => {
  const conversationId = req.params.conversation_id;
  conversationControllers.deleteConversation(conversationId)
    .then((data) => {
      if (data) {
        res.status(204).json({ message: "Conversation Deleted Successfully!" });
      } else {
        res.status(404).json({
            message: `INVALID ID`,
          });
      }
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};



module.exports = {
  postConversation,
  getConversationById,
  getAllConversations,
  patchConversation,
  deleteConversation
};
