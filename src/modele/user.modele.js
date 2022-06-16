const User = require('../../models/User')

const findUserByUsername = async ({ username }) => {
    let user = await User.findOne({username : username})
    return user;
}

module.exports = ({ findUserByUsername})