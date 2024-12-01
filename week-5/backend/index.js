const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Card} = require('./db');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/cards',async(req,res) => {
    const cards = await Card.find({});
    res.json(cards);
})

app.post('/card', async (req,res) => {
    const body = req.body;
    const name = body.name;
    const description = body.description;
    const interests = body.interests;
    await Card.create({
        name,
        description,
        interests
    })
    res.send('User created successfully')
})

app.put('/card', async (req,res) => {
    const body = req.body;
    const id = body.id;

    const newCard = {};
    if('name' in body){
        newCard['name'] = body.name;
    }
    if('description' in body){
        newCard['description'] = body.description;
    }
    if('interests' in body){
        newCard['interests'] = body.interests;
    }
    await Card.updateOne({_id:id},newCard);
    res.send('User info updated successfully');
})

app.delete('/card/:id', async (req,res) => {
    const id = req.params.id;
    await Card.deleteOne({_id:id});
    res.send('User deleted successfully')
})

app.listen(3000,() => console.log('Server running on port 3000'))