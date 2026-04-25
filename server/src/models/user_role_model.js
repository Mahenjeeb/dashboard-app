import { Schema, model } from "mongoose";
const userRolesSchema = new Schema({
    role : String,
    read : Boolean,
    write: Boolean,
    invite: Boolean
});
const userroles = model('userroles', userRolesSchema);
export default userroles;