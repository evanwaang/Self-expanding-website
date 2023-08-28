const { ServerDescriptionChangedEvent } = require("mongodb");
const { dbConnect, fetchBlogContent, fetchBlogById } = require("./dbConnect");

//!!!
// this is obviously inefficient, subject to change (or even deleting file)
fetchBlogContent()

module.exports = { dbConnect, fetchBlogContent, fetchBlogById };