let ObjectUtil = {}
var mongoose = require('mongoose');

// const generateUniqueId = () => `_${Date.now().toString(36)}${Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(36)}`;
ObjectUtil.generateUniqueId=(prefix) =>{
    const timestamp = Date.now(); // Get the current timestamp in milliseconds
    const randomSuffix = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
    return mongoose.mongo.ObjectId( `${prefix}${timestamp}${randomSuffix}`);
}

module.exports = ObjectUtil