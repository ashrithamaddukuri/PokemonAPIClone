const express = require('express')
const app = express()
const Product = require('./models/pokemon')
const productroute = require('./routes/pokemonroutes')

const connectdb = require('./config/db')
const userRoutes = require('./routes/authroute')

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.use(express.static("public"));


connectdb()


app.use('/v1',productroute)

app.get('/',(req,res)=>{
   res.end('service is running')

})

app.use('/v1',userRoutes)




app.listen(5001,()=>{
    console.log('server started')
})