async function verifyResponse(response){
    if(!response.ok){
        const error = await response.json();

        throw new Error(error.message || `Erro http:  ${response.status}`);
    }
    return response
}

// Criando função auxilar para obter o token amarzenado no localStorage
function obterToken(){
    return localStorage.getItem('token');
}

// Criando o http header para requisições autenticadas
function HeaderAuth(){
     const token = obterToken();
     return{
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
     }
}

const url_base = 'http://localhost:3333/users';