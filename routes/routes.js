const express = require('express');

const usersController = require('../controllers/users-controller')
const router = express.Router();

router.get('/add-user', usersController.addUsers);

router.post('/add-user', usersController.postAddUser);

router.get('/edit-user/:userId', usersController.getEditUser);

router.post('/edit-user', usersController.postEditUser);

router.get('/', usersController.getAddUser);


router.post('/delete', usersController.deleteUser);
module.exports = router;

