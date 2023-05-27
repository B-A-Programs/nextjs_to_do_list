import Library from "@models/library";
import Task from "@models/task";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
    const { name } = await req.json()
    const session = await getServerSession(req)

    try {
        await connectToDB();

        const user = await User.findOne({email: session.user.email})
        const library = await Library.findOne({name: name, creator: user})
        
        console.log(name)
        console.log(library)
        await Task.deleteMany({library: library})

        await Library.findOneAndDelete({name: name, creator: user})

        return new Response("Library deleteted successfully", {status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to delete library", {status: 500})
    }
}