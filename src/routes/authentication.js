const express = require('express');
const User = require('../../models/User')
const Organisation = require('../../models/Organisation')
const jwt = require('jsonwebtoken');

const router = express.Router();

/* POST /Login */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email == undefined || password == undefined)
        return res.status(400).json({ error: 'bad request' });

    let user = await User.findOne({ email: email, password: password });

    const token = jwt.sign({ username: user.username }, 'SECRET');
  res.json({
    data: {
      token,
      user,
      status: 'ok'
    },
  })
});

/* POST /registerUser */
router.post('/registerUser', (req, res) => {
    const {email, password, firstName, lastName, username, role, organisation} = req.body;
    if (email == undefined || password == undefined || firstName == undefined || lastName == undefined || username == undefined || role == undefined || organisation == undefined)
        return res.status(400).json({ error: 'bad request' });
    let newUser = new User({
        email : email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        role: role,
        organisation: organisation,
      })
      newUser.save();
    res.json({newUser, status: 'ok'});
});

/* POST /registerOrga */
router.post('/registerOrga', async (req, res) => {
    const {name, email, password, username} = req.body;
    if (email == undefined || password == undefined || username == undefined || name == undefined)
        return res.status(400).json({ error: 'bad request' });
        
    let newOrganisation = new Organisation ({
        name: name,
        password: password,
        email: email,
    });

    let user = await User.findOne({username: username})
    let userInfo = {firstName : user.firstName, lastName : user.lastName, email : user.email, username : user.username};
    newOrganisation.membres.push(userInfo)     
    newOrganisation.save();

    res.json({newOrganisation, status: 'ok'})
});

module.exports = router;