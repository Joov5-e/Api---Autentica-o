import modelUsers from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class UserController {

        static async findUsers(req, res) {
            try {
                const result = await modelUsers.listUsers();

                return res.status(200).json(result);

            } catch (error) {
                console.error(error);

                return res.status(500).json({
                    message: 'Erro de servidor!'
                });
            }
        }
            static async userRegisters(req, res) {
            try {
                const { nome, email, senha } = req.body;

                // Verifica campos obrigatórios
                if (!nome || !email || !senha) {
                    const message = 'Campos obrigatórios não preenchidos!';

                    return res.status(400).json({message});
                }
                // Verifica se o email já está cadastrado
                const userEmail = await modelUsers.findUserEmail(email);
                if (userEmail) {
                    let message = 'Email já cadastrado!';
                    return res.status(400).json({message});
                }
                // Criptografa a senha hash
                const hash = await bcrypt.hash(senha, 10);
                
                //levando os dados para o banco
                await modelUsers.registerUsers(nome, email, hash );
                let message = 'Usuário cadastrado com sucesso!';
                return res.status(201).json({ message});
                // Aqui ficará o restante do código para cadastrar o usuário
            } catch (error) {
                console.error(error);
                let message = 'Erro de servidor!';
                return res.status(500).json({ message });
            }
        }
        static async userlogin(req,res) {
        try {
            const { email, senha } = req.body;
            if(!email || !senha) {
                let message = 'Todos os campos são obrigatórios;'
                return res.status(400).json({message})
            }
                const  user = await modelUsers.findUserEmail(email)
                if(!user){
                    let message = 'Email ou senha inválidos.'
                    return res.status(400).json({message})
                }
                const passwordCompare = await bcrypt.compare(
                    senha,
                    user.senha
                )
                if(!passwordCompare){
                    let message = 'Email ou senha inválidos.'
                    return res.status(400).json({message})
                }
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                        //Payload - informações que serão armazenadas no token
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : '1h'
                    }
                )
                return res.status(200).json({
                    message: 'Login efetuado com sucesso.',
                    token
                })
        } catch (error) {
           console.error(error);
                let message = 'Erro de servidor!';
                return res.status(500).json({ message });
        }
    } 
    static async userAuthenticator(req,res){
        try {
            return res.status(200).json({
                user: req.user
            })
        } catch (error) {
            console.error(error);
                let message = 'Erro de servidor!';
                return res.status(500).json({ message });
        }
    }
}
export default UserController;