const User = require("../models/User")
const Post = require("../models/Post")
const db = require("../../config/db")
const jwt = require('jsonwebtoken')

exports.getAllPosts = async (req, res) => {
    try {
        const check = await db.execute(`SHOW TABLES LIKE 'posts'`)

        let createTablePost = new Post()

        if (check[0].length === 0) {
            await createTablePost.createTable()
            res.json({
                posts: []
            })
        } else {
            const posts = await db.execute(`SELECT * FROM posts;`)

            res.send({
                posts: posts[0],
                id_usuario_logado: req.userId,
                status: 200
            })
        }
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.body
        await db.execute(`DELETE FROM posts WHERE posts.id = ${id}`)

        res.send("Delete post route")
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { titulo, texto, id } = req.body
        await db.execute(`UPDATE posts SET titulo = '${titulo}', texto = '${texto}' WHERE id = ${id}`)

        res.send("Update post route")
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.createNewUser = async (req, res) => {
    try {
        const { nome, senha, email } = req.body
        const check = await db.execute(`SHOW TABLES LIKE 'users'`)

        let createUser = new User(nome, senha, email)
        let createTableUser = new User()
        if (check[0].length === 0) {
            await createTableUser.createTable().then(async () => { await createUser.save() })
        } else {
            await createUser.save()
        }
        res.send({status: 200})
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.createNewPost = async (req, res) => {
    try {
        const { titulo, texto } = req.body
        const check = await db.execute(`SHOW TABLES LIKE 'posts'`)
        const user = await db.execute(`SELECT * FROM users WHERE users.id = ${req.userId}`)

        let createPost = new Post(titulo, texto, req.userId, user[0][0].username)
        let createTablePost = new Post()

        if (check[0].length === 0) {
            await createTablePost.createTable().then(async () => { await createPost.save() })
        } else {
            await createPost.save()
        }

        res.send('Create post route')
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.getUsername = async (req, res) => {
    try {
        const user = await db.execute(`SELECT username FROM users WHERE users.id = ${req.userId}`)
        res.json(user[0][0])
    } catch (error) {
        res.send({ status: error.sqlState })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body

        const user = await db.execute(`SELECT * FROM users WHERE users.email = '${email}' AND users.password = '${senha}'`)

        const token = jwt.sign({ id: user[0][0].id }, "4MFIC395JMF83N28DSLKFJ49K6MMFKC8WN3", {
            expiresIn: '1d'
        })

        if (user[0].length == 0) {
            res.json({ erro: 'Credenciais invalidas ou não encontradas.' })
        } else if (user) {
            res.json({
                user: user[0][0],
                token: token,
                status: 200
            })
        }
    } catch (error) {
        res.send({ status: error.sqlState || 23000 })
    }

}