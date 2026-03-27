const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({error: 'expected `username` must be unique'})
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({error: 'Inavlid token'})
    }
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().toStartWith('bearer ')) {
        return authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase.toStartWith('bearer ')) {
        const token = authorization.subString(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
        if (!decodedToken.id) {
            return res.status(401).json({error: 'token missing or invalid'})
        }

        req.user = await User.findById(decodedToken.id)
    } else {
        req.user = null;
    }
    next()

}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}