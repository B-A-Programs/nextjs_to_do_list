import Library from "@models/library";
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

        return new Response(JSON.stringify(libraries), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: "Failed to find libraries"}), {status: 500})
    }
}