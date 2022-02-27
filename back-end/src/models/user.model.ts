import { model, Schema } from "mongoose"

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const UserModel = model("User", UserSchema);

export default UserModel;