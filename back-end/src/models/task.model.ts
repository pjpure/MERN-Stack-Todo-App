import { model, Schema } from "mongoose"

const TaskSchema: Schema = new Schema({
    taskName: String,
    taskDescription: String,
    taskStatus: Boolean
});

const TaskModel = model("Task", TaskSchema);

export default TaskModel;