import Library from "@models/library";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userId, libraryName } = await req.json();

    try {
        await connectToDB();

        await Library.create({
            name: libraryName,
            creator: userId,
        })

        return new Response("Prompt created successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to create library", {status: 500})
    }
}