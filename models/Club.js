const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name: {type: String, required: true, unique: true},
    Image : {type:String},
    points : [{date : Date,
        points : Number
    }],
    membres: [{
        firstName: String, 
        lastName: String,
        email: String,
        username: String,
    }],
    description: String,
    region: { type: String, unique: true},
    listAttente: [{
        firstName: String, 
        lastName: String,
        email: String,
    }]},
    {timestamps: true});
const Club = mongoose.model("Club", ClubSchema);
module.exports = Club;
