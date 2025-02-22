"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import {dbConnection} from "./mongo.js"
import apilimiter from "../src/middlewares/rate-limit-validator.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import postRoutes from "../src/post/post.routes.js"
import commentsRoutes from "../src/comments/comments.routes.js"
import categoriesRoutes from "../src/categories/categories.routes.js"
import { swaggerDocs, swaggerUI } from "./documentacion.js"
import  createAdmin   from "../src/auth/auth.controller.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extende: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy:{
            directives:{
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http//localhost:${process.env.PORT}`],
                imgSrc:["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            }
        }
    }))
    app.use(morgan("dev"))
    app.use(apilimiter)
}

const routes = (app) => {
    app.use("/gestionDeOpiniones/v1/auth", authRoutes)
    app.use("/gestionDeOpiniones/v1/user", userRoutes)

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
    

}


const conectarDB = async () => {
    try{
        await dbConnection()

    }catch(err){
        console.log(`Conexion a la base de datos fallida: ${err}`)
        process.exit(1)

    }
}

export const initServer = () =>{
    const app = express()
    try{
        createAdmin()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Inicializacion del servidor fallida ${err}`)
    }
}