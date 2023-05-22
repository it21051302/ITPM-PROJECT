//import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const signup = (req, res) => {
    console.log(req.body);

    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registerd!'
        })

        const {
            firstName,
            lastName,
            email,
            question,
        } = req.body
        console.log(req.body);

        const _user = new User({
            firstName,
            lastName,
            email,
            question,
            username: Math.random().toString()
        })
        console.log(_user);
        _user.save((error, userData) => {
            if(error){
                return res.status(400).json({
                    message: 'Something Went Wrong!!!'
                })
            }
            if(userData){
                return res.status(201).json({
                    message: "User Registration Success"
                })
            }
        })
        if(error) return res.status(400).json({message: "Something Went Wrong!!!"})
    })
}

const signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error){
            return res.status(400).json({Error: "User Not Found!!!"})
        }
        if(user){
            if(user.authenticate(req.body.password)){
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