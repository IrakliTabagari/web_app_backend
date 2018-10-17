const { User, validateUser } = require('./user');
const { Right } = require('./right');
const { State } = require('./state');
const { Session } = require('./session');


//get all rights
async function getAllRights(req, res){   
    let rights =  await Right.find();	// exclude passwords
    res.send( rights );
}

// update user's rights
async function updateUserRights(req, res){
    // 1. update user's rights
    // 2. change state to InActive for all user's sessions

    let user = await User.findByIdAndUpdate(req.params.id,
        {
            rights: req.body.rights
        }, { new: true });    
    if(!user) return res.status(404).send('User with this id does not exists');
    
    let inactiveState = await State.findOne({ name: "Inactive" });

    let sessions = await Session.find({'user._id': req.params.id});
    if(sessions.length>0){
        sessions.forEach(async session => {
            await Session.findByIdAndUpdate(session._id,
                {
                    state: inactiveState
                }, { new: true });
        });
    }

    res.send(user);
}




exports.getAllRights        = getAllRights;
exports.updateUserRights    = updateUserRights;