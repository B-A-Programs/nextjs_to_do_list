import { Schema, model, models } from "mongoose"

const LibrarySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Library name is required!'],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

const Library = models.Library || model("Library", LibrarySchema);

export default Library;