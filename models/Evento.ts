import { Schema, model, InferSchemaType, Document } from "mongoose";

interface IEvento extends Document {
    _id: number | null;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: Schema.Types.ObjectId;
}

const EventoSchema: Schema = new Schema({
    title: { type: String, required: true },
    notes: { type: String },
    start: { type: Date, requiered: true },
    end: { type: Date, requiered: true },
    user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});


EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

export default model<IEvento>('Evento', EventoSchema);


