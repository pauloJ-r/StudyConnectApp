const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/comentariocontroller');
const checkToken = require('../middlewares/authMiddleware');

// rota /comentarios     criar um comentario
router.post('/', checkToken, ComentarioController.createComentario);

// rota /comentarios/post/:postId        pegar comentarios de um post
router.get('/post/:postId', ComentarioController.getComentariosByPost);

// rota /comentarios/post/:userId         pegar comentarios de um user especifico
router.get('/user/:userId', ComentarioController.getComentariosByUser);

// rota /comentarios/:id            remover comentario
router.delete('/:id', checkToken, ComentarioController.removeComentario);

// rota /comentarios/:comentarioId/like         dar like em um comentario
router.put('/:comentarioId/like', checkToken, ComentarioController.toggleLike);

// rota /comentarios/:comentarioId/likes-count          contabilizar quantos likes tem um comentario
router.get('/:comentarioId/likes-count', ComentarioController.getLikesCount);

// rota comentarios releventes
router.get('/:userId/relevantComentario', ComentarioController.comentariosRelevantes);

module.exports = router;
