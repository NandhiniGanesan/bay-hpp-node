const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema(
    {
    
    emailid: String,

    name : String,
    
    password : String,
   
    mobnum : String,
    
    address : String,
        
    role : String
    },
    {
        collection : 'userprofile',
        versionKey : false
    }

)

module.exports = mongoose.model('userprofile',userProfileSchema)