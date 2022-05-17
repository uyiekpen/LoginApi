const mongoose = require("mongoose")

const CarRegister =  mongoose.Schema({
    UserName : {
        type: String,
        required : true,
        
    },
    email : {
        type : String,
        required : true,
        unique : true

    },
    password : {
        type: String,
        required :true


    },
    isAdmin : {
        type: Boolean,
        default: true,
    },
    
},
{
    timestamp: true,
}
)

const Register = mongoose.model("CarRegister", CarRegister)
module.exports = Register   