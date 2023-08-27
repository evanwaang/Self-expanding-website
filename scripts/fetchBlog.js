const { dbConnect, fetchBlogContent } = require("./dbConnect");
const { ObjectId } = require('mongodb');

fetchBlogContent()
    .then(docs => {
        docs.forEach(doc => {
            console.log(doc.content);
        });
    })
    .catch(err => console.error(err));
    module.exports = { fetchBlogContent };

    

async function fetchBlogById(blogId) {
    const client = await dbConnect();
    const collection = client.collection(COLLECTION_NAME);
    
    const blog = await collection.findOne({ _id: ObjectId(blogId) });
    
    await client.close();
    return blog;
}

module.exports = { dbConnect, fetchBlogContent, fetchBlogById };