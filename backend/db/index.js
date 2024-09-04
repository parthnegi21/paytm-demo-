const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://parthnegi021:xrUz7ajK4iD29Oda@cluster0.k7n3l.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0")

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
