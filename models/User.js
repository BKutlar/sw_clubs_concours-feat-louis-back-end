const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    createAt: {type: Date, default: Date.now },
    role: String,
    organisation : String,
    clubJoin: {type: Boolean, default : false},
    club :[{clubName: String, role: String}],
    clubInvitation : [{
        clubName : String,
    }],
    points : [{date : Date,
    points : Number}]},
    {timestamps: true}
);
const User = mongoose.model("User", UserSchema);

module.exports = User;
