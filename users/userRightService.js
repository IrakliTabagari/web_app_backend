const express = require('../node_modules/express');
const router = express.Router();
//const mongoose = require('../node_modules/mongoose');

const checkSession = require('../middleware/checkSession');
const { 
    getUserRight,
    getRightsRight,
    updateUserRightsRight
    //addRightsToUserRight,
   // deleteRightFromUserRight
} = require('../middleware/checkUserServiceRights');
const { 
    getAllRights,
    updateUserRights
} = require('./userRightController');

//get all rights
router.get('/', [checkSession, getRightsRight], 
    getAllRights
);

// update user's rights
router.put('/:id', [checkSession, getUserRight, updateUserRightsRight], 
    updateUserRights
);


module.exports = router;