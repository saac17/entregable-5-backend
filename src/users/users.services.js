const userControllers = require('./users.controllers')

//? Get, Post

const getAllUsers = (req, res) => {
    userControllers.findAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMyUser = (req, res) => {
    const id = req.user.id 
    userControllers.findUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postUser = (req, res) => {
    const {firstName, lastName, email, password, profImg, phone} = req.body
    userControllers.createUser({firstName, lastName, email, password, profImg, phone})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                firstName: 'String',
                lastName: 'String',
                email: 'example@example.com',
                password: 'String',
                ProfImg: 'https://imgur.com/photo.png',
                phone: 'String'
            }})
        })
}

//? Solo admins pueden ejecutarlo
const patchUser = (req, res) => {
    const id = req.params.id 
    const {firstName, lastName, email, ProfImg, phone, role, status} = req.body

    userControllers.updateUser(id, {firstName, lastName, email, ProfImg, phone, role, status})
        .then((data) =>{
            if(data){
                res.status(200).json({message: `User edited succesfully with id: ${id}`})
            } else {
                res.status(404).json({message: `User with id: ${id}, not found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName, ProfImg, phone } = req.body
    userControllers.updateUser(id, {firstName, lastName, ProfImg, phone})
        .then(() => {
            res.status(200).json({message: 'Your user was edited succesfully!'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

//? Solo admins pueden ejecutarlo
const deleteUser = (req, res) => {
    const id = req.params.id 
    userControllers.deleteUser(id)
        .then((data) => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: `User with id:${id}, Not Found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id 
    userControllers.deleteUser(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports= {
    getAllUsers,
    getMyUser,
    getUserById,
    postUser,
    patchMyUser,
    patchUser,
    deleteMyUser,
    deleteUser
}
