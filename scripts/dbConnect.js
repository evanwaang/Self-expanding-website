const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://evanwaang2020:Dickpickle2002@cluster0.necsgex.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'blogs';
const COLLECTION_NAME = 'response';

const client = new MongoClient(process.env.MONGODB_URI || MONGODB_URI);

async function dbConnect() {
  try {
      mongoose.connect("mongodb+srv://evanwaang2020:Dickpickle2002@cluster0.necsgex.mongodb.net/?retryWrites=true&w=majority")
      const client = await MongoClient.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log("Connection established - All well");
      const db = client.db(DATABASE_NAME);
      return { client, db };
  } catch (error) {
      console.log("Connection failed:", error);
      throw error;
  }
}

async function fetchBlogContent() {
  console.log("in")
  const { client, db } = await dbConnect();
  console.log("out")
  const collection = db.collection(COLLECTION_NAME);
  
  const contentDocs = await collection.find({}).toArray();
  
  console.log(contentDocs)
  await client.close()
  return contentDocs;



}

module.exports = { dbConnect, fetchBlogContent };