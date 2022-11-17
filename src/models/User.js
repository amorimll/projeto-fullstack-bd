const db = require("../../config/db")

class User {
    constructor (nome, senha, email) {
        this.nome = nome
        this.senha = senha
        this.email = email
    }

    save() { 
        let sql = `
        INSERT INTO users(
            username,
            password,
            email
        )
        VALUES (
            '${this.nome}',
            '${this.senha}',
            '${this.email}'
        )
        `
        const newUser = db.execute(sql)

        return newUser
    }

    createTable() {
        let sql = `
        CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(16) NOT NULL,
            email VARCHAR(100) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
            UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);
        `

        const newUserTable = db.execute(sql)

        return newUserTable
    }
}

module.exports = User