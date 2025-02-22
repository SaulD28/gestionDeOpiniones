import { config } from "dotenv"

import { initServer } from "./configs/server.js"

config()

initServer()

console.log("Estoy ejecutando este archivo")