import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { id } = await req.json()

    try {
        await connectToDB();

        await Task.findByIdAndDelete(id)

        return new Response("Task deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete task", {status: 500})
    }
}