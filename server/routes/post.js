const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');
const checkToken = require('../middlewares/authMiddleware');


//rota /posts   criar um post
router.post('/', checkToken, postController.createPost);

//rota /posts     pegar toods os posts
router.get('/', postController.getPosts);

//rota /posts/:id       pegar posts com um id do posts
router.get('/:id', postController.getPostById);

//rota /posts/user/:userId        pegar posts de um determinado user
router.get('/user/:userId', postController.getPostsByUserId);

//rota /posts/:id       atualizar posts pelo id
router.put('/:id', checkToken, postController.updatePost);

//rota /posts/:id           deletar posts pelo id
router.delete('/:id', checkToken, postController.removePost);

//rota /posts/:postId/like          dar like em posts
router.put('/:postId/like', checkToken, postController.toggleLike);

//rota /posts/:postId/likes-count     contar quantos likes no post
router.get('/:postId/likes-count', postController.getLikesCount);

// Rota para pesquisar posts
router.get('/search', checkToken, postController.searchPosts);

// Rpta para buscar posts relevantes
router.get('/:userId/relevantPost', postController.postsRelevantes);

/* EXEMPLOS DE ROTAS PARA PESQUISA

Buscar posts com a tag javascript:
GET /posts/search?tag=javascript

Buscar posts criados por João:
GET /posts/search?username=João

Buscar posts contendo a palavra backend no título ou texto:
GET /posts/search?keyword=backend

Combinação: Buscar posts do usuário João com a tag javascript:
GET /posts/search?username=João&tag=javascript

*/ 

module.exports = router;
