require('dotenv').config();
const { exec } = require('child_process');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb+srv://evanwaang2020:Dickpickle2002@cluster0.necsgex.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'blogs';
const COLLECTION_NAME = 'response';

async function generateContent() {
    const command = `
      curl https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" \
      -d '{
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": "explain why japan is obsessed over younger women"}],
          "temperature": 0.2
       }'
    `;

    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        const response = JSON.parse(stdout);
        const content = response.choices[0].message.content;

        // Connect to MongoDB
        const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);

        // Save the generated content to MongoDB
        await collection.insertOne({ content: content, isProcessed: false, createdAt: new Date() });

        await client.close();
    });
}

generateContent().catch(console.error);
