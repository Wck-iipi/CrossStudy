
import { ObjectId } from 'mongodb';

// Interface for the 'topics' collection
interface Topic {
  _id: ObjectId; // Optional
  topicName: string;
  subtopics?: ObjectId[];
  filesUrl?: string[];
}

// Interface for the 'users' collection
interface User {
  _id?: ObjectId; // Optional
  userId: string;
  displayName: string;
  preferredTopics?: ObjectId[];
}

// Interface for the 'conversations' collection
interface Conversation {
  _id?: ObjectId; // Optional
  topicId: ObjectId;
  userId: string;
  messages: Message[];
}

// Interface for the 'messages' array within 'conversations'
interface Message {
  role: 'user' | 'llm';
  content: string;
  timestamp: Date;
}

// Interface for the 'llm_generated_questions' collection
interface LLMGeneratedQuestion {
  _id?: ObjectId; // Optional
  topicId: ObjectId;
  questionText: string;
  timestamp: Date;
}

// Interface for the 'generated_content' collection
interface GeneratedContent {
  _id?: ObjectId; // Optional
  topicId: ObjectId;
  subtopicName: string;
  contentItems: ContentItem[];
}

// Interface for the 'contentItems' array within 'generated_content'
interface ContentItem {
  contentId?: ObjectId; // Optional 
  contentText: string;
  timestamp: Date;
}
