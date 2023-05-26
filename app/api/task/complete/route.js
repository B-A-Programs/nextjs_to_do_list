import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { id } = await req.json()

    try {
        await connectToDB();

        const task = await Task.findById(id)

        task.status = "Completed"
        
        task.save()

        return new Response("Task updated successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to update task", {status: 500})
    }
}