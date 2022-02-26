import { model, Schema } from "mongoose"

const TaskSchema: Schema = new Schema({
    taskName: { type: String, required: true },
    taskDescription: String,
    taskStatus: {
        type: Boolean,
        default: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const TaskModel = model("Task", TaskSchema);

export default TaskModel;