import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'Admin already registerd!'
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
            role: "admin"
        })
        _user.save((error, userData) => {
            if(error){
                return res.status(400).json({
                    message: 'Somesthing went wrong'
                })
            }
            if(userData){
                return res.status(201).json({
                    message: "Admin Registration Success"
                })
            }
        })
    })
}
const signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error){
            return res.status(400).json({Error: "User Not Found!!!"})
        }
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'1h'})
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user

                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName 
                    }
                })
            }
            else{
                return res.status(400).json({
                    message: "Invalid Password"
                })
            }
        }
        else{
            return res.status(400).json({messege: "Something Went Wrong!!!"})
        }
    })
}

export { signin, signup }
