const db = require("../../config/db")

class Post {
    constructor(titulo, texto, userid, username) {
        this.titulo = titulo
        this.texto = texto
        this.userid = userid
        this.username = username
    }

    save() {
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

    createTable() {
        let sql = `
        CREATE TABLE posts (
            id INT NOT NULL AUTO_INCREMENT,
            titulo VARCHAR(100) NOT NULL,
            texto VARCHAR(2000) NOT NULL,
            userid INT NOT NULL,
            username VARCHAR(50) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
            INDEX userid_idx (userid ASC) VISIBLE,
            CONSTRAINT id
              FOREIGN KEY (userid)
              REFERENCES users (id)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION);
          
        `

        const newPostTable = db.execute(sql)

        return newPostTable
    }
}

module.exports = Post