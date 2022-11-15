const User = require("../models/User")
const Post = require("../models/Post")
const db = require("../../config/db")
const jwt = require('jsonwebtoken')

exports.getAllPosts = async (req, res) => {
    const posts = await db.execute(`SELECT * FROM posts;`)
    
    res.json({
        posts: posts[0],
        id_usuario_logado: req.userId
    })
}

exports.deletePost = async (req, res) => {
    const { id } = req.body
    await db.execute(`DELETE FROM posts WHERE posts.id = ${id}`)

    res.send("Delete post route")
}

exports.updatePost = async (req, res) => {
    const { titulo, texto, id } = req.body
    await db.execute(`UPDATE posts SET titulo = '${titulo}', texto = '${texto}' WHERE id = ${id}`)

    res.send("Update post route")
}

exports.createNewUser = async (req, res) => {
    const { nome, senha, email } = req.body

    let user = new User(nome, senha, email)

    user = await user.save()

    res.send("Create user route")
}

exports.createNewPost = async (req, res) => {
    const {titulo, texto} = req.body
    const user = await db.execute(`SELECT * FROM users WHERE users.id = ${req.userId}`)

    let post = new Post(titulo, texto, req.userId, user[0][0].username)

    post = await post.save()

    res.send("Create post route")
}

exports.loginUser = async (req, res) => {
    const { email, senha } = req.body

    const user = await db.execute(`SELECT * FROM users WHERE users.email = '${email}' AND users.password = '${senha}'`)

    const token = jwt.sign({id: user[0][0].id}, "4MFIC395JMF83N28DSLKFJ49K6MMFKC8WN3", {
        expiresIn: '1d'
    })

    if (user[0].length == 0) {
        res.json({erro: 'Credenciais invalidas ou não encontradas.'})
    } else if (user) {
        res.json({
            user: user[0][0],
            token: token
        })
    }
    
}