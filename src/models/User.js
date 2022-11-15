const db = require("../../config/db")

class User {
    constructor (nome, senha, email) {
        this.nome = nome
        this.senha = senha
        this.email = email
    }

    save () { 
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

    static findAll() {}
}

module.exports = User