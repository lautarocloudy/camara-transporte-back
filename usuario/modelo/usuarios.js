const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{type: String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    role:{type:String, require:true},
    informe:{type:String},

})

module.exports= model("User", UserSchema, "users") 