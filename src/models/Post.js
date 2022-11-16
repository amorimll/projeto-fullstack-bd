const db = require("../../config/db")

class Post {
    constructor (titulo, texto, userid, username) {
        this.titulo = titulo
        this.texto = texto
        this.userid = userid
        this.username = username
    }

    save () { 
        let sql = `
        INSERT INTO posts(
            titulo,
            texto,
            userid,
            username
        )
        VALUES (
            '${this.titulo}',
            '${this.texto}',
            '${this.userid}',
            '${this.username}'
        )
        `
        const newPost = db.execute(sql)

        return newPost
    }
}

module.exports = Post