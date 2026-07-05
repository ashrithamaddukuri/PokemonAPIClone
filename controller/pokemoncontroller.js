const axios = require("axios");
const Pokemon = require("../models/pokemon");

// CREATE
exports.create = async (req, res) => {
    try {

        const pokemon = await Pokemon.create(req.body);

        res.status(201).json({
            message: "Pokemon created successfully",
            data: pokemon
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};


//search pokemon by name
exports.searchPokemon = async (req, res) => {
    try {
        const name = req.query.name;

        const pokemon = await Pokemon.find({
            name: { $regex: name, $options: "i" }
        });

        res.status(200).json({
            message: "Pokemon found",
            data: pokemon
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


//get by type
exports.getByType = async (req, res) => {
    try {
        const type = req.query.type;

        const pokemon = await Pokemon.find({
            "types.name": type
        });

        res.status(200).json({
            message: "Pokemon fetched",
            data: pokemon
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


// GET ALL
exports.getall = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "pokemonId";

        const skip = (page - 1) * limit;

        const pokemon = await Pokemon.find()
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            count: pokemon.length,
            data: pokemon
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


// GET BY ID
exports.getById = async (req, res) => {

    try {

        const pokemon = await Pokemon.findById(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokemon not found"
            });
        }

        res.status(200).json({
            message: "Data fetched",
            data: pokemon
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


// UPDATE
exports.update = async (req, res) => {

    try {

        const pokemon = await Pokemon.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokemon not found"
            });
        }

        res.status(200).json({
            message: "Pokemon updated",
            data: pokemon
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


// DELETE
exports.deletepoke = async (req, res) => {

    try {

        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokemon not found"
            });
        }

        res.status(200).json({
            message: "Pokemon deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


//Fetch data from pokeapi using axios
exports.fetchPokemon = async (req, res) => {
    try {

        const name = req.params.name;

        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        const data = response.data;

        const pokemon = new Pokemon({
            pokemonId: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            baseExperience: data.base_experience,
            types: data.types.map(t => ({
                name: t.type.name
            })),
            abilities: data.abilities.map(a => ({
                name: a.ability.name,
            }))
        });

        await pokemon.save();

        res.json({
            message: "Pokemon fetched successfully",
            data: pokemon
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};