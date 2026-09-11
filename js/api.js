import { json } from "body-parser";
import { response } from "express";
import { register } from "node:module";

async function verifyResponse(response) {
    if (!response.ok) {
        const error = await response.json();

        throw new Error(
            error.message || `Erro http: ${response.status}`
        );
    }

    return response;
}

function obterToken() {
    return localStorage.getItem("token");
}

function HeaderAuth() {
    const token = obterToken();

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
}

function httpHeader(){
    return{
        "Content-Type" : "application/json"
    }
}

const url_base = "http://localhost:3333/users";

const app = {
    async listUsers() {
        try {
            const response = await fetch(url_base, {
                method: "GET",
                headers: HeaderAuth()
            });

            await verifyResponse(response);

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async registerUser(register){
        try {
            const reponse = await fetch (`${url_base}/register`, {
                method: "POST",
                headers: HeaderAuth(),
                body: JSON.stringify(register)
            })
            await verifyResponse(reponse)
            return reponse.json()
        }catch(error){
            console.error(error)
            throw error
        }
    },

    async loginUser(login){
        try {
            const reponse = await fetch(`${url_base}/auth/login`,{
                method: "POST",
                headers : httpHeader(),
                body: JSON.stringify(login)
            })
            await verifyResponse(reponse)
            return reponse.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
};