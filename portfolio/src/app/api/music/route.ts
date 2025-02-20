import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const directoryPath = path.join(process.cwd(), 'public/media/music'); // Directory path to audio files

  try {
    const files = fs.readdirSync(directoryPath).filter((file) => {
      // Only include audio files (adjust as necessary)
      return /\.(mp3|wav|ogg)$/i.test(file);
    });

    return Response.json(files); // Return the list of files as JSON
  } catch (error) {
    return Response.json({ error: "Error reading directory" });
  }
}
