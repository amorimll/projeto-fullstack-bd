const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    auth: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro, token não enviado."
            })
        }

        const [, token] = authHeader.split(' ')

        try {
            const decode = await promisify(jwt.verify)(token,"4MFIC395JMF83N28DSLKFJ49K6MMFKC8WN3")
            req.userId = decode.id
            return next()
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro, token inválido."
            })
        }
    }
}