import { Schema, model, InferSchemaType, Document } from "mongoose";


interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UsuarioSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, requiered: true }
});



export default model<IUser>('Usuario', UsuarioSchema);


