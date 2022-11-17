require("dotenv").config()

const express = require('express');
const app = express();
const cors = require('cors')
const { auth } = require('../middleware/auth')

const PORT = process.env.PORT || 3001;

const postRoutes = require("./routes/registerRoutes")
const loginRoutes = require("./routes/loginRoutes")
const homeFeed = require("./routes/homeRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(express.json())
app.use(cors())

app.use("/posts", postRoutes)
app.use("/login",  loginRoutes)
app.use("/homeFeed", auth, homeFeed)
app.use("/username", auth, userRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}/`)
})