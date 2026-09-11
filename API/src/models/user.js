import conect from "../config/database.js";  

async function listUsers(){
   try{ 
    const sql = `
     select * from users; 
     `;
     const [dados] = await conect.query(sql)
        return dados;
   } catch (error) {
    console.error(error)
   }
}
async function registerUsers(nome, email, senha){
     try{
        const sql = `
     insert into users (nome, email, senha) values (?, ?, ?);
     `;
     const [dados] = await conect.query(sql, [nome, email, senha])
     return dados;
     } catch (error) {
        console.error(error)
     }throw error;
}

async function findUserEmail(email){
    try{
        const sql= `select * from users where email = ?`;
        const [dados] = await conect.query(sql,[email])
        return dados[0] 
    } catch (error) {
        console.error(error)
    }
}
export default {listUsers, registerUsers, findUserEmail};