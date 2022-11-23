const { body, validationResult } = require("express-validator")
const { response } = require("../app")

const db = require("../models")
const User = db.users
const Op = db.Sequelize.Op

const saveUser = ((request, response) => {
    const errors = validationResult(request)    
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    const requestBody = request.body
    const newUser = {
        firstName: requestBody.firstName,
        middleName: requestBody.middleName,
        lastName: requestBody.lastName,
        mothersLastName: requestBody.mothersLastName,
        email: requestBody.email,
        phoneNumber: requestBody.phoneNumber,
        dateOfBirth: requestBody.dateOfBirth
    }    

    User.create(newUser)
        .then(data => {
            return response.status(201).json(data)        
        })
        .catch((error) => {
            console.debug(error)
            return response.status(500).send({
                message: "Some unexpected error occured"
            })
        }
    )    
    
})

const getUsers = ((request, response) => {
    User.findAll().then(users => response.status(200).json(users))
    .catch(err => response.status(500).send({message: "Some unexpected error occured"}))
})

module.exports = {
    saveUser,
    getUsers
}