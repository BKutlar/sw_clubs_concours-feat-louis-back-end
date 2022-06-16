const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
    name: {type: String, required: true, unique : true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    membres: [{
        firstName: String, 
        lastName: String,
        email: String,
    }],
    Club: [{
        clubName: { type: String, unique: true}
    }]},
    {timestamps: true},
);

const Organisation = mongoose.model("Organisation", OrganisationSchema);
module.exports = Organisation;