import { model, Schema } from "mongoose"

const TaskSchema: Schema = new Schema({
    taskName: String,
    taskDescription: String,
    taskStatus: {
        type: Boolean,
        default: false
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const TaskModel = model("Task", TaskSchema);

export default TaskModel;