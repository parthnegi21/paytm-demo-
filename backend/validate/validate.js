const z = require("zod")


const uservalidate = z.object({
    username:z.string().email("Invalid username"),
    firstname:z.string().min(1,"Name can not be empty"),
    lastname:z.string().min(1,"name can not be empty"),
    password:z.string().min(6,"Password should be at least 8 letters")
})
const updateone=z.object({
    firstname:z.string().min(1,"Name can not be empty"),
    lastname:z.string().min(1,"Name can not be empty"),
    password:z.string().min(8,"password should be at least 8 letters")
})

module.exports={uservalidate,updateone}
