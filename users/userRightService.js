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

const { asyncMiddleware } = require('../middleware/asyncMiddleware');



//get all rights
router.get('/', [checkSession, getRightsRight], 
    asyncMiddleware(getAllRights)
);

// update user's rights
router.put('/:id', [checkSession, getUserRight, updateUserRightsRight], 
    asyncMiddleware(updateUserRights)
);


module.exports = router;