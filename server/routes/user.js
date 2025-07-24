const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const checkToken = require('../middlewares/authMiddleware');
const upload = require('../config/multer');
const badgeController = require('../controllers/badgeController');



router.post('/auth/register', UserController.register);

router.post('/auth/login', UserController.login);

router.get('/user/:id', UserController.getUserById);

router.put('/user/:id', UserController.updateUser, checkToken, upload.single('picture'));

router.get('/users', UserController.getUsers, checkToken);

// Rota /user/top-likes          para obter os 5 usuários com mais likes
router.get('/user/top-likes', UserController.getTopUsersByLikes);

// Rota /user/:userId/badges       para obter os badges de um usuário específico
router.get('/user/:userId/badges', badgeController.getUserBadges);

// Rota para obter quantos badges um usuário tem
router.get('/user/:userId/badges/count', badgeController.getUserBadgesCount);


module.exports = router;
