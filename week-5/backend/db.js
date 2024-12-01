const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sanskar_office:password4869@cluster0.bln31ts.mongodb.net/cards')

const CardSchema = mongoose.Schema({
    'name': String,
    'description': String,
    'interests' : [{
        type:String
    }]
})

const Card = mongoose.model("Card",CardSchema);

module.exports = {Card}