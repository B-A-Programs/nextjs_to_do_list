import Library from "@models/library";
import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { name } = await req.json();

    try {
        await connectToDB();

        const library = await Library.findOne({name: name})

        const toDo = await Task.find({library: library, status: "ToDo"})
        const completed = await Task.find({library: library, status: "Completed"})

        return new Response(JSON.stringify({ toDo, completed }), {status: 200})
    } catch (error) {
        return new Response("Failed to create task", {status: 500})
    }
}