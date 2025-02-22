import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword


        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}

export const createAdmin = async () => {
    try {

    const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

    if (adminExists) {
        console.log("El usuario de administrador ya existe, no se puede crear otro");
        return;
    }

    const hashedPassword = await hash("admin");

    const userAdmin = new User({
        name: "admin",
        surname: "admin",
        username: "admin",
        email: "admin",
        password: hashedPassword,
        role: "ADMIN_ROLE"
    });

    await userAdmin.save();
    console.log("Administrador creado exitosamente");
    } catch (error) {
    console.error("Error al verificar o crear el Administrador:", error.message);
    }
};

export default createAdmin;