
import { Db, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Topic } from './schema';
const uri = "mongodb+srv://varunkainthla21:bsmUf7ti3FjLNhsG@chat.qa20g.mongodb.net/?retryWrites=true&w=majority&appName=Chat";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbName = 'chat_application';

export async function createDatabaseWithStructureAndValidation(): Promise<void> {
  try {
    let db: Db;
    await client.connect();
    db = client.db(dbName);

    // Check if the database exists (optional)
    const adminDb = client.db('admin');
    const result = await adminDb.command({ listDatabases: 1 });
    const databaseList = result.databases;
    const databaseExists = databaseList.some((db: any) => db.name === dbName);

    if (!databaseExists) {
      console.log(`Creating database: ${dbName}`);

      // 1. Create Collections with Schema Validation:

      // --- topics ---
      await db.createCollection('topics', {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["topicName"],
            properties: {
              topicName: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              parentTopicId: {
                bsonType: "objectId",
                description: "must be an objectId"
              },
              subtopics: {
                bsonType: "array",
                items: {
                  bsonType: "objectId"
                },
                description: "must be an array of objectIds"
              },
              filesUrl: {
                bsonType: "array",
                items: {
                  bsonType: "string",
                },
                description: "must be a string"
              }
            }
          }
        }
      });

      // --- users --- 
      await db.createCollection('users', {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["userId", "displayName"],
            properties: {
              userId: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              displayName: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              preferredTopics: {
                bsonType: "array",
                items: {
                  bsonType: "objectId"
                },
                description: "must be an array of objectIds"
              }
            }
          }
        }
      });

      // --- conversations ---
      await db.createCollection('conversations', {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["topicId", "userId", "messages"],
            properties: {
              topicId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
              },
              userId: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              messages: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["role", "content", "timestamp"],
                  properties: {
                    role: {
                      bsonType: "string",
                      enum: ["user", "llm"],
                      description: "must be a string and is required"
                    },
                    content: {
                      bsonType: "string",
                      description: "must be a string and is required"
                    },
                    timestamp: {
                      bsonType: "date",
                      description: "must be a date and is required"
                    }
                  }
                },
                description: "must be an array of message objects and is required"
              }
            }
          }
        }
      });

      // --- llm_generated_questions ---
      await db.createCollection('llm_generated_questions', {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["topicId", "questionText", "timestamp"],
            properties: {
              topicId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
              },
              questionText: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              timestamp: {
                bsonType: "date",
                description: "must be a date and is required"
              }
            }
          }
        }
      });

      // --- generated_content ---
      await db.createCollection('generated_content', {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["topicId", "subtopicName", "contentItems"],
            properties: {
              topicId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
              },
              subtopicName: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              contentItems: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["contentId", "contentText", "timestamp"],
                  properties: {
                    contentId: {
                      bsonType: "objectId",
                      description: "must be an objectId and is required"
                    },
                    contentText: {
                      bsonType: "string",
                      description: "must be a string and is required"
                    },
                    timestamp: {
                      bsonType: "date",
                      description: "must be a date and is required"
                    }
                  }
                },
                description: "must be an array of content item objects and is required"
              }
            }
          }
        }
      });

      // 2. Create Indexes:

      // --- topics ---
      await db.collection('topics').createIndex({ topicName: 1 });

      // --- users ---
      await db.collection('users').createIndex({ userId: 1 });

      // --- conversations ---
      await db.collection('conversations').createIndex({ topicId: 1, userId: 1 });

      // --- llm_generated_questions ---
      await db.collection('llm_generated_questions').createIndex({ topicId: 1 });

      // --- generated_content ---
      await db.collection('generated_content').createIndex({ topicId: 1, subtopicName: 1 });

      console.log(`Database ${dbName} created with structure and validation successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }

  } finally {
    await client.close();
  }
}

export function convertTopicsDataToSchema(data: string, name: string): Topic[] {
  const lines = data.split('\n').filter(line => line.trim() !== '' && line.trim() !== '-'); // Filter out empty lines and lines with '-'
  const topics: Topic[] = [];
  const parentStack: { topic: Topic, level: number }[] = []; // Track parent stack with indentation level

  // Create the top-level parent topic (name provided as argument)
  const firstTopic: Topic = {
    _id: new ObjectId(),
    topicName: name,
    subtopics: []
  };
  topics.push(firstTopic); // Add the first topic (root) to the list

  for (const line of lines) {
    const indentationLevel = line.search(/\S/); // Find indentation level (spaces before text)
    const topicName = line.trim().replace(/^-+\s*/, ''); // Trim and remove any leading '-'

    if (topicName) {
      const topic: Topic = {
        _id: new ObjectId(), // Generate a new ObjectId for the topic
        topicName, // Assign the cleaned-up topic name
        subtopics: []
      };

      // Ensure the topic is added to the global `topics` array as an individual entry
      topics.push(topic);

      // Handle root-level topics by adding them as subtopics of the first topic
      if (indentationLevel === 0) {
        firstTopic.subtopics!.push(topic._id); // Add topic's _id to the subtopics of the first topic
        parentStack.push({ topic, level: indentationLevel }); // Push the topic to the parent stack
      } else {
        // Adjust the stack until the correct parent level is found
        while (parentStack.length > 0 && parentStack[parentStack.length - 1].level >= indentationLevel) {
          parentStack.pop();
        }

        if (parentStack.length > 0) {
          const parent = parentStack[parentStack.length - 1].topic;
          parent.subtopics!.push(topic._id); // Add topic's _id to the subtopics of the current parent
        }

        parentStack.push({ topic, level: indentationLevel }); // Add the current topic to the stack
      }
    }
  }

  return topics; // Return the array of all topics
}

export async function uploadTopicsToDatabase(topics: Topic[]): Promise<void> {
  let db: Db;
  try {
    await client.connect(); // Establish connection
    db = client.db(dbName);

    const topicsCollection = db.collection('topics');
    await topicsCollection.insertMany(topics);
    console.log('Topics uploaded successfully.');

  } catch (error) {
    console.error('Error uploading topics:', error);
    throw error; // Re-throw error 
  } finally {
    await client.close(); // Close the connection in the finally block
  }
}
