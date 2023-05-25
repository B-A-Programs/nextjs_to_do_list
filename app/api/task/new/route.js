import Library from "@models/library";
import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userId, name, task, date } = await req.json();

    try {
        await connectToDB();

        const library = await Library.findOne({name: name})

        await Task.create({
            text: task,
            creator: userId,
            library: library,
            dueBy: date,
            status: "ToDo",
        })

        return new Response("Task created successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to create task", {status: 500})
    }
}