const mongoose = require("mongoose")
const {Schema} = mongoose;


const usersSchema = new Schema({
    fullName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    paymentID:{
        type: String,
        require: true
    },
    image:{
        data: Buffer,
        contentType: String
    },
    emailVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: "student",
        enum:["student", "admin", "teacher"]
    },
    randomOtp:{
        type: String
    },
    updated:{
        type: Date
    },
    updated:{
        type: Date,
        default: new Date
    },
})


module.exports = mongoose.model("User", usersSchema);