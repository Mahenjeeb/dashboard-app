import { Schema, model } from "mongoose";
const environmentSchema = new Schema({
   name: { type: String, required: true, unique: true },
   value: { type: String, required: true, unique: true },
   isActive: {type: Boolean, default: true},
   application : {type: Schema.Types.ObjectId, ref: "applications", required: true}
})

const Environment = model('environments', environmentSchema);
export default Environment;