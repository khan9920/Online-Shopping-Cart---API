const express = require('express');
const router = express.Router();

// require controller
const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);      // route to GET ALL USERS
router.route('/:id').get(userController.getUser);       // route to GET USER
router.route('/').post(userController.addUser);         // route to ADD USER
router.route('/:id').patch(userController.updateUser);  // rout to EDIT USER
router.route('/:id').delete(userController.deleteUser); // rout to DELETE USER

module.exports = router;