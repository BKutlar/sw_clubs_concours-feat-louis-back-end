const express = require('express');
const User = require('../../models/User')
const Concours = require('../../models/Concours')
const Club = require('../../models/Club')
const Organisation = require('../../models/Organisation')

const api = express.Router();


/* POST /createClub */
api.post('/createClub', async (req, res) => {
    const {name, description, region} = req.body;

    let user = req.user;
    if(user.role == 'superUser'){
        let club = {clubName : name, role : "Fondateur"}
        let userInfo = {firstName : user.firstName, lastName : user.lastName, email : user.email, username : user.username};
        user.club.push(club)

        let newClub = new Club({
            name: name,
            description: description,
            region: region,
        });

        newClub.membres.push(userInfo);
        newClub.save();
        user.save();
        res.json(newClub);
    }else{
        res.status(400).json({ error: 'Rôle innaproprié' });
    }
});

/* POST /createConcours A FAIRE*/
api.post('/createConcours', (req, res) => {
    const {name, startDate, endDate} = req.body;
    console.log(name, startDate, endDate)
    let newConcours = new Concours({
        name: name,
        startDate: startDate,
        endDate: endDate,
    })

    newConcours.save();
    res.send(newConcours)
});

/* POST /clubAuto */
api.post('/clubAuto', async (req, res) => {

    let username = req.user.username;
    await User.findOne({username : username}).then( docs => {
        if(docs){
            if(docs.clubJoin){
                docs.clubJoin = false;
            }else{
                docs.clubJoin = true;
            }
            docs.save();
            res.json(docs);
        }else{
            res.status(400).json({ error: 'User introuvable' });
        }
    })  
});

/* GET /findUser */ 
api.get('/findUser', (req, res) => {
    res.send('req.user');
});

/* GET /getUser */
api.get('/getUser', (req, res) => {
    res.json(req.user)
});

/* GET /getOrganisation */
api.get('/getOrga', (req, res) => {
    Organisation.find({}).then(orga => {
        res.json(orga)
    })
})

/* GET /getClub */
api.get('/getClub', (req, res) => {
    Club.find({}).then(club => {
        res.json(club)
    })
})

/* POST /givePoints */
api.post('/givePoints', (req, res) => {
    const {username, points} = req.body;
    User.findOne({username : username}).then(user => {
        let date = new Date()
        let score = {
            date : date.getTime(),
            points : points,
        }
        console.log(score)
        user.points.push(score)
        user.save();
        res.json(user)
    })
})

/* GET /memberOrga */
api.get('/memberOrga', async (req, res)=> {
    let organisation = req.user.organisation;
    let members = [];
    await Organisation.find({name: organisation}).then(member => {
        members.push(member)
    })
    res.json(members)
});

/* GET /memberClub */
api.get('/memberClub', async (req, res) => {
    let club = req.user.club;
    if(club == undefined){
        res.status(400).json({ error: 'bad request' });
    } else{
        let members = [];
        await Club.find({name: club}).then(member => {
            members.push(member)
        })
        res.json(members)
    }
})

/* GET /listMemberInvitation */
api.get('/listMemberInvitation', async (req, res) => {
    let users = [];
    await User.find({clubJoin : true, role : "user", "club.0": {$exists:false}}).then( user => {
        console.log(user)
        users.push(user)
    })
    res.json(users);
});

/* POST /clubInvitation */
api.post('/clubInvite', (req, res) => {
    let username = req.username;
    let club = req.club;
    User.findOne({username : username}).then(user => {
        user.clubInvitation.push(club)
        user.save();
    })
    res.json({message: 'Invitation envoyé'})
});

/* GET /listInvitationClub */
api.get('/listInvitationClub', async (req, res) => {
    if(req.user.club == undefined){
        res.status(400).json({error: 'Possède déjà un club'})
    }else{
        let clubInvitation = req.user.clubInvitation;
        res.json(clubInvitation)
    }
})
module.exports = api;