const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentariocontroller');
const checkToken = require('../middlewares/authMiddleware');

// rota /comentarios     criar um comentario
router.post('/', checkToken, comentarioController.createComentario);

// rota /comentarios/post/:postId        pegar comentarios de um post
router.get('/post/:postId', comentarioController.getComentariosByPost);

// rota /comentarios/post/:userId         pegar comentarios de um user especifico
router.get('/user/:userId', comentarioController.getComentariosByUser);

// rota /comentarios/:id            remover comentario
router.delete('/:id', checkToken, comentarioController.removeComentario);

// rota /comentarios/:comentarioId/like         dar like em um comentario
router.put('/:comentarioId/like', checkToken, comentarioController.toggleLike);

// rota /comentarios/:comentarioId/likes-count          contabilizar quantos likes tem um comentario
router.get('/:comentarioId/likes-count', comentarioController.getLikesCount);

module.exports = router;
