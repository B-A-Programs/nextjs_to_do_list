import Library from "@models/library";
import Task from "@models/task";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
    const session = await getServerSession(req)

    try {
        await connectToDB();

        const user = await User.find({
            email: session.user.email
        })

        const libraries = await Library.find({
            creator: user,
        })

        let date = new Date()
        date.setDate(date.getDate() + 1)
        date = date.toISOString().split('T')[0]

        const tasks = await Task.find({
            library: { "$in": libraries },
            dueBy: { "$lt": date },
            status: "ToDo",
        }).populate('library')

        const urgentLibs = Object.values(tasks).map((task) => (task.library.name))

        return new Response(JSON.stringify({libraries: libraries, urgentLibs: (urgentLibs)}), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: "Failed to find libraries"}), {status: 500})
    }
}