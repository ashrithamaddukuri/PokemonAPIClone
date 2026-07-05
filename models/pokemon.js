const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({

    pokemonId: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    baseExperience: Number,

    types: [
        {
            name: String
        }
    ],

    abilities: [
        {
            name: String
        }
    ],

    sprites: {
        frontDefault: String
    }

});

module.exports = mongoose.model("Pokemon", pokemonSchema);