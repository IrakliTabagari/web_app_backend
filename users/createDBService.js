const express = require('express');
const router = express.Router();

const Fawn = require('../node_modules/fawn');	// for Transactions / npm install fawn
const bcrypt = require('../node_modules/bcrypt');	// for hashing password / npm install bcrypt
const { User, validateUser } = require('./user');
const { State } = require('./state');
const { Session } = require('./session');
const { Right } = require('./right');
const { asyncMiddleware } = require('../middleware/asyncMiddleware');

// Login
router.post('/createDB', asyncMiddleware(async (req, res) => {
    // States
    let activeState = new State({
        name : "Active",
        description : "Record is Active"        
    });
    let inactiveState = new State({
        name : "Inactive",
        description : "Record is Inactive (Disabled/Deleted)"        
    });

    await activeState.save();
    await inactiveState.save();

    // Rights
    let newRights = [
        new Right({name:"deleteUser",description:"delete user (change stateId to Disabled)"}),
        new Right({name:"updateUser",description:"Update user object"}),
        new Right({name:"addUser",description:"Add new User"}),
        new Right({name:"addRightsToUser",description:"Add Right to User"}),
        new Right({name:"getUser",description:"Get User Info"}),
        new Right({name:"getUsers",description:"Get Users Array"}),
        new Right({name:"deleteRightFromUser",description:"Change User's Right State to Disabled"}),
        new Right({name:"updateUserRights",description:"update user's Rights"}),
        new Right({name:"getRights",description:"get all rights"}),
        new Right({name:"resetPassword",description:"reset password - when nobody knows current password"}),
        new Right({name:"changePassword",description:"change password - when you know old password"}) ,
        new Right({name:"activateUser",description:"Activate inactive User"}) 
    ];
    await newRights.forEach(right => right.save());
    // let newRight;
    // for(let i=0; i<newRights.length; i++){
    //     newRight = newRights[i];
    //     await newRight.save();
    // }
    // User
    const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash("admin", salt);
    let user = new User({
        userName: "admin",
        password: hashedPassword,
        state: activeState,
        email: "admin@admin.com",
        rights: newRights
    });
    await user.save();
    res.send(user);
}));

module.exports = router;