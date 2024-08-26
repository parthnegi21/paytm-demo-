const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/mydatabase")

const userSchema=new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})

const accountSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:'true'
},
balance:{
    type:Number,
    required:'true'
}

})

const Account = mongoose.model('Account',accountSchema)
const User=mongoose.model('User',userSchema)


module.exports = {User,Account};
