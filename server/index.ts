
import express from 'express';
import cors, { CorsOptions } from 'cors'; // Import the cors library
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createDatabaseWithStructureAndValidation, uploadTopicsToDatabase, convertTopicsDataToSchema } from './mongodb';
import { Topic } from './schema';
import { ObjectId } from 'mongodb';

// Load environment variables
dotenv.config();
createDatabaseWithStructureAndValidation().catch(console.dir);

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
let chat = model.startChat();

const app = express();
const port = process.env.PORT || 3000;

// Enable JSON body parsing
app.use(express.json());

// Enable CORS with specific origins (optional)
// Replace 'http://localhost:5173' with your React app's origin
const allowedOrigins = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: true
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.post('/chat', async (req: express.Request, res: express.Response) => {
  // TODO: userID based on user session
  const userId = req.body.userId || 'default'; // Use a unique user ID
  const userMessage = req.body.message;

  if (!userMessage) {
    res.status(400).send('Missing message');
  }

  try {
    const result = await chat.sendMessage(userMessage);
    const aiResponse = result.response.text();
    res.json({ message: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating response');
  }
});

app.post('/topicsStorage', async (req: express.Request, res: express.Response) => {
  const syllabus = req.body.syllabus; 
  console.log(syllabus);

  if (!syllabus) {
    res.status(400).send('Missing syllabus'); 
  }

  try {
    const name_of_topic_result = await chat.sendMessage(syllabus+"What should be the name of the main topic? Just write the name and nothing else.");
    const name_of_topic = name_of_topic_result.response.text().replace("**", "").replace("**", "");

    const topics = convertTopicsDataToSchema(syllabus, name_of_topic); // Parse LLM output into Topic objects
    console.log('The schema was');
    console.log(topics);
    await uploadTopicsToDatabase(topics); // Upload topics to the database

    res.status(200).send('Topics uploaded successfully'); // Send a success response

  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing syllabus'); // General error message
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
