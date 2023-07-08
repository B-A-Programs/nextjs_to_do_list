import Library from "@models/library";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { userId, libraryName } = await req.json();

    try {
        await connectToDB();

        const existingLibrary = await Library.find({
            name: libraryName,
            creator: userId,
        })

        if(existingLibrary.length > 0)
            return new Response("Failed to create library", {status: 500})

        await Library.create({
            name: libraryName,
            creator: userId,
        })

        return new Response("Prompt created successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to create library", {status: 500})
    }
}