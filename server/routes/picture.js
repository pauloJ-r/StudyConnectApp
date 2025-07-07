const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const pictureController = require('../controllers/pictureController');



const checkToken = require('../middlewares/authMiddleware');


//rota /pictures/upload     upar imagem para o perfil
router.post('/upload', checkToken, upload.single('picture'), pictureController.create);

// rota /pictures/remove        remover foto do perfil
router.delete('/remove', checkToken, pictureController.remove);

module.exports = router;
