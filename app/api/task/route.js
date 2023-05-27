import Library from "@models/library";
import Task from "@models/task";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
    const { name } = await req.json();
    const session = await getServerSession(req)

    try {
        await connectToDB();

        const user = await User.find({
            email: session.user.email
        })

        const library = await Library.findOne({name: name, creator: user})

        const toDo = await Task.find({library: library, status: "ToDo"}).sort({dueBy: 1})
        const completed = await Task.find({library: library, status: "Completed"}).sort({dueBy: 1})

        return new Response(JSON.stringify({ toDo, completed }), {status: 200})
    } catch (error) {
        return new Response("Failed to create task", {status: 500})
    }
}