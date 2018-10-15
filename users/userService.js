const express = require('express');
const router = express.Router();
// import authentication middlewares
const checkSession = require('../middleware/checkSession');
const { 
    addUserRight, 
    getUsersRight, 
    getUserRight,
    deleteUserRight,
    updateUserRight,
    //addRightsToUserRight,
    //deleteRightFromUserRight
    changePasswordRight,
    resetPasswordRight
} = require('../middleware/checkUserServiceRights');
// import User controllers
const { 
    getUsers, 
    getUserById, 
    login,
    logOut,
    getHashedPass,
    addUser,
    updateUser,
    deleteUser,
    changePassword,
    resetPassword
} = require('./userController');
// import asyncMiddleware for handling errors
const { asyncMiddleware } = require('../middleware/asyncMiddleware');


//get all users
router.get('/', [checkSession, getUsersRight], 
    asyncMiddleware(getUsers)
);

//get user by id
router.get('/:id', [checkSession, getUserRight], 
    asyncMiddleware(getUserById)
);

// Login
router.post('/login', 
    asyncMiddleware(login)
);

// Logout
router.post('/logout', 
    asyncMiddleware(logOut)
);


//insert new User
router.post('/', [checkSession, addUserRight], 
    asyncMiddleware(addUser)
);

//update user
router.put('/:id', [checkSession, getUserRight, updateUserRight], 
    asyncMiddleware(updateUser)
);

//delete user
router.delete('/:id', [checkSession, getUserRight, deleteUserRight], 
    asyncMiddleware(deleteUser)
);

//change password
router.post('/changePassword', [checkSession, changePasswordRight], 
    asyncMiddleware(changePassword)
);

//reset password
router.post('/resetPassword', [checkSession, resetPasswordRight], 
    asyncMiddleware(resetPassword)
);


module.exports = router;