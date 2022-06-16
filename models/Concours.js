const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConcoursSchema = new Schema({
    name: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true}, 
},
    {timestamps: true});
const Club = mongoose.model("Concours", ConcoursSchema);

module.exports = Club;
