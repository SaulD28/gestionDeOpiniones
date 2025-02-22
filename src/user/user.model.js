import {Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Nombre es requerido"],
        maxLength: [25, "Nombre no puede exceder mas de 25 caracteres"]

    },
    surname:{
        type: String,
        required: [true, "Apellido es requerido"],
        maxLength: [25, "El apellido no puede exceder mas de los 25 caracteres"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: [true, "El"],
        unique: true, 
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
    
},
{
    versionKey: false,
    timeStamps: true
})
userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)
