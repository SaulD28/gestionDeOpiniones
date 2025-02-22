import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Gestor_de_opiniones API",
            version:"1.0.0",
            description: "API para sistema de gestion de opiniones",
            contact:{
                name: "Saul Donnis",
                email: "edidonis42@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestionDeOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUI }