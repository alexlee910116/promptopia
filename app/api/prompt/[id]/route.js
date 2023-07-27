import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });

  }
};

// PATCH (update)
export const PATCH = async (req, { params, body }) => {
  const {prompt, tag} = await req.json();
  try {
    await connectToDB();

    const existedPrompt = await Prompt.findById(params.id);
    if (!existedPrompt) return new Response("Prompt not found", { status: 404 });

    existedPrompt.prompt = prompt;
    existedPrompt.tag = tag;

    await existedPrompt.save();
    return new Response(JSON.stringify(existedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}

//DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
}