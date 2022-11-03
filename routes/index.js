const express = require('express')
const router = express.Router()
const Words = require('../models/words-schema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
Object

// Get all words
router.get('/words/all', async (req, res) => {
    // use try catch block to handle possible exceptions
    try {
        // Query to fetch all words from the DB
        const words = await Words.find()
        res.status(200).json(words) //api-endpoint response
    } catch (err) {
        res.status(500).json({ message: err.message }) //api-endpoint response (Handles possible errors)
    }
})

// Add a word
router.post('/words/add', async (req, res) => {
    // use try catch block to handle possible exceptions
    try {
        // Check if word already exists
        const exists = await Words.findOne({ word: req.body.word })

        if (exists) res.status(405).json({ message: 'Word already exists' }) //api-endpoint response if word already exist
        
        // Else, make a create query to store a new word into the DB
        await Words.create(req.body)
        res.status(200).json({ message: 'Word added successfully.' }) //api-endpoint response

    } catch (err) {
        res.status(500).json({ message: err.message })  //api-endpoint response (Handles possible errors)
    }
})

//Update a word
router.patch('/words/update', async (req, res) => {
    // get id of word from the request object
    const { id } = req.query

    // use try catch block to handle possible exceptions
    try {
        if (Object.keys(req.body).length === 0) res.status(400).json({ message: 'Bad request' }) // (HANDLE) check if request body is empty
        if (!id) res.status(400).json({ message: 'Id is not available' }) // (HANDLE) check if id was not provided

        // Make an update query to the database
        await Words.where({ _id: ObjectId(id) }).updateOne(req.body)
        res.status(200).json({ message: 'Word updated successfully' }) //api-endpoint response
    } catch (error) {
        res.status(500).json({ message: err.message })  //api-endpoint response (Handles possible errors)
    }
})


// Delete a word
router.delete('/words/remove', async (req, res) => {
    // get id of word from the request object
    const { id } = req.query

    // use try catch block to handle possible exceptions
    try {
        // (HANDLE) check if id was not provided
        if (!id) res.status(400).json({ message: 'Id is not available' })

        // Make a delete query to the database
        await Words.where({ _id: ObjectId(id) }).deleteOne()
        res.status(200).json({ message: 'Word deleted successfully' }) //api-endpoint response
    } catch (error) {
        res.status(500).json({ message: err.message })  //api-endpoint response (Handles possible errors)
    }
})



module.exports = router;