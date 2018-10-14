const mongoose = require('../node_modules/mongoose');

const Fawn = require('../node_modules/fawn');	// for Transactions / npm install fawn
const bcrypt = require('../node_modules/bcrypt');	// for hashing password / npm install bcrypt
const { User, validateUser } = require('./user');
const { State } = require('./state');
const { Session } = require('./session');

Fawn.init(mongoose);

//get all users
async function getUsers(req, res) {   
    let users =  await User.find().select('-password');	// exclude passwords
    res.send( users );
}

//get user by id
async function getUserById(req, res){
    let user = await User.findById(req.params.id);
    res.send(user);
}

// Login
async function login(req, res){
    // hashing password

    if(!req.body.userName || !req.body.password){ 
        return res.status(400).send('invalid request');
    }

    let user = await User.findOne({ userName: req.body.userName});
    if(!user){ 
        return res.status(400).send({warning: 'invalid username or password'});
    }

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!user || !validPassword || user.state.name !== "Active") return res.status(404).send('User with this userName and password does not exists');
    
    let activeState = await State.findOne({ name: "Active" });

    const newSession = new Session({
        user: user,
        //startDate: Date.now,
        //endDate: Date.now() + 4*3600*1000,
        state: activeState
    });
    //newSession.user = user;
    //newSession.state = activeState;
    
    await newSession.save();
    newSession.user.password = "";
    //console.log(req);
    res.send(newSession);
}


// logOut
async function logOut(req, res){
    // hashing password

    if(!req.get('sessionId') || req.get('userName')){ 
        return res.status(400).send('invalid request');
    }

    let session = await Session.findById(req.get('sessionId'));
    let now = new Date();
    let inactiveState = await State.findOne({ name: "Inactive" });

    if(session && session.endDate < now && session.state.name === "Active"){
        await Session.findByIdAndUpdate(session._id,
            {
                state: inactiveState
            }, { new: true });
        return res.send(session);
    }else{
        return  res.status(404).send('Session with this id or username does not exists');
    }    
}

// get hashed password
async function getHashedPass(req, res){
    // hashing password
    try{
        console.log(req.body.password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        res.send(hashedPassword);
    }catch(ex){
        console.log(ex.message);
        res.send('Something went wrong');
    }	
}

//insert new User
async function addUser(req, res){
    //const error = await validateUser(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
        
    let user = await User.findOne({ userName: req.body.userName });
    if(user) return res.status(400).send('User with this user name already exists');

    user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User with this email already exists');

    let state = await State.findOne({ name: "Active" });

	// hashing password
	const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    let newUser = new User({
        userName: req.body.userName,
        password: hashedPassword,
        state: state,
		email: req.body.email,
        rights: []
    });
    
	//  await newUser.save();
	// Transaction can be chained
	try{
		new Fawn.Task()
			.save('users', newUser)
			//.update('asd', asd) // for chaining
			.run();
		res.send(newUser);
	}catch(ex){
		res.status(500).send('Saving new user failed.');
	}
    
}

//update user
async function updateUser(req, res){

    // hashing password
	const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    let user = await User.findByIdAndUpdate(req.params.id,
        {
            password: hashedPassword,
            email: req.body.email            
        }, { new: true })
        .select('-password');    
    if(!user) return res.status(404).send('User with this id does not exists');
    
    res.send(user);
}

//delete user
async function deleteUser(req, res){

    let inactiveState = await State.findOne({ name: "Inactive" });

    let user = await User.findByIdAndUpdate(req.params.id,
        {
            state: inactiveState            
        }, { new: true })
        .select('-password');    
    if(!user) return res.status(404).send('User with this id does not exists');

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

// change password
async function changePassword(req, res){

    let user = await User.findOne({ userName: req.body.userName });
    let validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
    
    if(!user || !validPassword ) return res.status(404).send('User with this userName and password does not exists');
    if(!req.body.newPassword || req.body.newPassword === "") return res.status(400).send('new password is invalid');

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

    user = await User.findByIdAndUpdate(user._id,
        {
            password: hashedNewPassword            
        }, { new: true })
        .select('-password');

    let inactiveState = await State.findOne({ name: "Inactive" });

    let sessions = await Session.find({'user._id': user._id});
    
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

// reset password
async function resetPassword(req, res){

    let user = await User.findOne({ userName: req.body.userName });
    if(!user) return res.status(404).send('User with this userName and password does not exists');
    if(!req.body.password || req.body.password === "") return res.status(400).send('new password is invalid');
    
    // hashing password
	const salt = await bcrypt.genSalt(10);
	const hashedNewPassword = await bcrypt.hash(req.body.password, salt);
    
    user = await User.findByIdAndUpdate(user._id,
        {
            password: hashedNewPassword            
        }, { new: true })
        .select('-password');

    let inactiveState = await State.findOne({ name: "Inactive" });
    let sessions = await Session.find({'user._id': user._id});
    
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


exports.getUsers        = getUsers;
exports.getUserById     = getUserById;
exports.login           = login;
exports.logOut          = logOut;
exports.getHashedPass   = getHashedPass;
exports.addUser         = addUser;
exports.updateUser      = updateUser;
exports.deleteUser      = deleteUser;
exports.changePassword  = changePassword;
exports.resetPassword   = resetPassword;
