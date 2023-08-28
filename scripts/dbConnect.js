const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://evanwaang2020:Dickpickle2002@cluster0.necsgex.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'blogs';
const COLLECTION_NAME = 'response';
const { ObjectId } = require('mongodb');

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

// no need to call twice to dbConnect, these funcitons are both going to be used regardless, it should share same client. 
async function fetchBlogById(blogId) {
  const { client, db } = await dbConnect();
  const collection = db.collection(COLLECTION_NAME);
  const blog = await collection.findOne({ _id: new ObjectId(blogId) });
  await client.close();
  return blog;
}

module.exports = { dbConnect, fetchBlogContent, fetchBlogById };