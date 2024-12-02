const bcrypt = require('bcrypt')


const authhelper = {
 hashPassword : async(pwd) => {
    try{
        const saltRounds = 5
        const hashed_pwd = await bcrypt.hash(pwd, saltRounds)
        return hashed_pwd
    }catch(error){
        console.log(error)
    }
},

comparePwd : (password,hashed_password) => {
    return bcrypt.compare(password,hashed_password)
}
}

module.exports = authhelper
