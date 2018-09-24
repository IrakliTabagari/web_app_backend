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
    getHashedPass,
    addUser,
    updateUser,
    deleteUser,
    changePassword,
    resetPassword
} = require('./userController');


//get all users
router.get('/', [checkSession, getUsersRight], 
    getUsers
);

//get user by id
router.get('/:id', [checkSession, getUserRight], 
    getUserById
);

// Login
router.post('/login', 
    login
);

//insert new User
router.post('/', [checkSession, addUserRight], 
    addUser
);

//update user
router.put('/:id', [checkSession, getUserRight, updateUserRight], 
    updateUser
);

//delete user
router.delete('/:id', [checkSession, getUserRight, deleteUserRight], 
    deleteUser
);

//change password
router.post('/changePassword', [checkSession, changePasswordRight], 
    changePassword
);

//reset password
router.post('/resetPassword', [checkSession, resetPasswordRight], 
    resetPassword
);


module.exports = router;