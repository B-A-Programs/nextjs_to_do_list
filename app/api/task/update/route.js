import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { id, text, date } = await req.json()

    try {
        await connectToDB();

        const task = await Task.findById(id)

        task.text = text
        task.date = date
        
        task.save()

        return new Response("Task updated successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to update task", {status: 500})
    }
}