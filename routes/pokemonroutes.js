const express = require('express')
const router = express.Router()
const {create,searchPokemon,getByType,getall,getById,update,deletepoke,fetchPokemon} = require('../controller/pokemoncontroller')



router.post("/pokemon", create);


router.get("/pokemon", getall);
router.get("/pokemon/type", getByType);
router.get("/pokemon/search", searchPokemon);


router.get("/pokemon/:id", getById);


router.put("/pokemon/:id", update);


router.delete("/pokemon/:id", deletepoke);

router.get("/pokemon/fetch/:name", fetchPokemon);

module.exports = router;