const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Register = require("./Model/Register")
const {validateForm} = require("./Validate")
const { findOne } = require("./Model/Register")
const { hash } = require("bcrypt")



const GetUser = async(req, res)=>{
    try{
        const GetData = await Register.find()
        res.status(200).json({
            message : "All Data",
            Data: GetData ,
        })
    }catch(err){
        res.status(400).json(err.message)
    }

}

const getSingleUser = async(req, res)=>{
    try{
        const GetData = await Register.findById(req.params.id,req.body)
        res.status(200).json({
            message : "Data",
            Data: GetData ,
        })
    }catch(err){
        res.status(400).json(err.message)
    }

}

const RegisterUser = async(req,res)=>{
    try{
        const {UserName , email , password} = req.body
        
        // this function is checking for an already existing email in the platform
        const checkEmail = await Register.findOne({
            email: email
        })
        if (checkEmail){
            return res.json({
                messsage : "email already been used"
            })
        }
        //validate form for user
        const {error} = validateForm(req.body)
        if(error){
            res.status(409).json({
                message: error.details[0].message
            })
        }else{
            
        //hash password with bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const PostData = await Register.create({
            UserName,
            email,
            password: hashpassword,
        })
        res.status(200).json({
            message: "Login Succesfully",
            data: PostData
        })

        }
        
        
    }catch(err){
        res.status(400).json(err.message)
    }
}

const SignInUser = async(req, res) => {
    try{
        const {email, password} = req.body
        const Finduser = await Register.findOne({email})

        if(Finduser){
            const checkPassword = await bcrypt.compare(password, Finduser.password)

            if(checkPassword){
                const {password, ...info} = Finduser._doc

                const token = jwt.sign(
                    {
                        id: Finduser._id,
                        email: Finduser.email,
                        UserName: Finduser.UserName,

                    },
                    "Thisisthe",
                    {expiresIn :"1d"}
                )
                return res.status(200).json({
                    message: `welcome back$ {Finduser.UserName}`,
                    data : {token, ...info}
                })
            }else {
                return res.status(400).json({
                    message: "password incorrect"
                }
                )
            }

           
        }else{
           return res.status(404).json({
               message: "user not found"
           }) 
        }
        

    }catch(err){
        return res.status(400).json(err.message)
    }
}

module.exports = {
    GetUser,
    getSingleUser,
    RegisterUser,
    SignInUser
}