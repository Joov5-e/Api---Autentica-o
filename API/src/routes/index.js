import express from "express";
import routesUser from "./userRoutes.js";
 
const Routes = (app) =>{ 
    app.route('/').get((req,res)=> {
        let message = 'servidor em funcionamento'
        res.status(200).send(message)
    })
    app.use(express.json(), routesUser)
}
export default Routes;
