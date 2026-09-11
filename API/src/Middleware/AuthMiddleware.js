import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function authMiddleware(req, res, next){
    // ==> chamar autorização do token
    const autorization = req.headers.authorization;
    if(!autorization){
        return res.status(400).json({
            message: 'Token não informado.'
        })
    }
    try{
        const token = autorization.split(" ")[1]
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = payload
        next()
    }catch(error){
        console.error.status(401).json({
            message: 'Token inválido.'
        })
    }
}

export default authMiddleware;