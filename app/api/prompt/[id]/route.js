import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
// GET (read)

//this is a get request that fetches all prompts from the database
//it is an async function that takes in a request object
//it connects to the database and then fetches all prompts

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag, image } = await request.json();

  try {
    await connectToDatabase();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.image = image;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        await Prompt.findByIdAndRemove(params.id);

        return new Response(JSON.stringify({message: "Prompt deleted successfully"}), {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}