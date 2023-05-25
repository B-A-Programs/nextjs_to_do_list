import { Schema, model, models } from "mongoose"

const TaskSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Task text is required!'],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    library: {
        type: Schema.Types.ObjectId,
        ref: 'Library',
    },
    status: {
        type: String,
    },
    dueBy: {
        type: Date,
        required: [true, 'Date is required'],
    }
})

const Task = models.Task || model("Task", TaskSchema);

export default Task;