const express = require ('express')
//const cors = require ('course')
const routes = require ('./routes/routes')

// Declarar la variable para el servidor web
const app = express()

// Middleware
//app.use (cors())
app.use (express.json ())
app.use ('/', routes)

const PORT = process.env.PORT || 501

app.listen (PORT, () =>
{
    console.log (`Listen Port: ${PORT}`)
})