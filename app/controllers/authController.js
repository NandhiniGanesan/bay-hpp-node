
const authhelper = require('../helpers/authhelper')
const userprofmodel = require('../models/userprofmodel')

const authController = {
    registerController: async (req, res) => {
        try {
            const { emailid, name, password, mobnum, address, role } = req.body

            if (!emailid) return res.status(401).send({ error: `Email id is missing` })
            if (!password) return res.status(401).send({ error: `Password is missing` })

            const exitstingUser = await userprofmodel.findOne({ emailid })
            console.log(exitstingUser)

            if (exitstingUser) {
                return res.send(200).send({error: 'Already a registered User, Please login'
                })
            }

            const hashedPwd = await authhelper.hashPassword(password)
            const user = await new userprofmodel({ name, emailid, password: hashedPwd, mobnum, address, role }).save()

            res.status(201).send({
                success: true,
                message: 'User Registered successfully', user
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: 'Error in Registration', error
            })
        }
    },

    loginController : async (req, resp) => {
        try {
            const { emailid, password } = req.body
    
            if (!emailid) return resp.status(401).send({ error: `Email id is missing` })
            if (!password) return resp.status(401).send({ error: `Password is missing` })
    
            //get user
            const user = await userprofmodel.findOne({emailid})
    
            if(!user) return resp.status(400).send({
                success : false,
                message :'Email is not registered'})
    
            const matchPwd = await authhelper.comparePwd(password,user.password)
            if(!matchPwd) return resp.status(400).send({
                success : false,
                message :'Username or Password is invalid'})
    
            const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,
                {
                    expiresIn : '1d'
                }
            )
    
            resp.status(200).send({
                success: false,
                message: 'Logged In Successfully', 
                    user : {name : user.name, email : user.emailid, phone : user.phone},
                token
            })
    
        } catch (error) {
            console.log('error', error)
            resp.status(501).send({
                success: false,
                message: 'Error in Login', error
            })
        }
    }
}

module.exports = authController