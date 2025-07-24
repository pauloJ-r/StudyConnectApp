const Post = require('../models/post');
const Comentario = require('../models/comentario');
const User = require('../models/User');
const { updateUserBadges } = require('../controllers/badgeController');


class PostController {

// Criar post
 async createPost(req, res) {
    const { titulo, texto, userId } = req.body;
    try {
        const post = await Post.create({ titulo, texto, userId});
        res.status(201).json(post);
    } catch (error) {
        console.error('Erro ao criar o post:', error);
        res.status(500).json({ error: 'Erro ao criar o post.' });
    }
};

// Buscar todos os posts
async getPosts(req, res) {
    try {
        const posts = await Post.find().populate('userId', '-password');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        res.status(500).json({ error: 'Erro ao buscar os posts.' });
    }
};
// Buscar posts de um usuário específico
 async getPostsByUserId(req, res) {
    const { userId } = req.params;
    try {
        console.log('Procurando posts para o userId:', userId); // Adicione log para depuração
        const posts = await Post.find({ userId }).populate('userId', '-password');
        console.log('Posts encontrados:', posts); // Adicione log para verificação
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'Nenhum post encontrado para este usuário.' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar posts do usuário.' });
    }
};


// Buscar post por ID
 async getPostById(req, res) {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('userId', '-password');
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao buscar o post:', error);
        res.status(500).json({ error: 'Erro ao buscar o post.' });
    }
};

// Atualizar post
async updatePost(req, res) {
    const { id } = req.params;
    const { titulo, texto } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(id, { titulo, texto }, { new: true });
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Erro ao atualizar o post:', error);
        res.status(500).json({ error: 'Erro ao atualizar o post.' });
    }
};

// Remover post
async removePost(req, res) {
    const { id } = req.params;
    try {
        console.log(`Tentando remover post com ID: ${id}`);
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            console.log('Post não encontrado');
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        console.log('Post removido:', post);
        await Comentario.deleteMany({ postId: id });
        console.log('Comentários associados ao post removidos');
        res.status(200).json({ message: 'Post removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover o post:', error);
        res.status(500).json({ error: 'Erro ao remover o post.' });
    }
};

// Adicionar ou remover um like
async toggleLike(req, res) {
    try {
        const { postId } = req.params;
        const userId = req.user.id; // Supondo que você tenha middleware de autenticação que adiciona `req.user`

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }

        // Verifica se o usuário já deu like
        const likeIndex = post.likes.indexOf(userId);

        if (likeIndex === -1) {
            // Se o usuário não deu like, adiciona o like
            post.likes.push(userId);
        } else {
            // Caso contrário, remove o like
            post.likes.splice(likeIndex, 1);
        }

        await post.save();

        await updateUserBadges(postId, "post");


        res.status(200).json({ message: 'Like atualizado com sucesso', likes: post.likes });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar like', error: error.message });
    }
};




// Obter a quantidade de likes de um post
async getLikesCount(req, res) {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }

        // Retorna a quantidade de likes
        res.status(200).json({ postId: post._id, likesCount: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter a quantidade de likes', error: error.message });
    }
};

async searchPosts(req, res) {
    try {
        const { tag, username, keyword } = req.query;

        // Construir filtro dinâmico
        const filter = {};

        // Pesquisar por tag
        if (tag) {
            filter.tags = { $regex: tag, $options: 'i' }; // Pesquisa com insensibilidade a maiúsculas/minúsculas
        }

        // Pesquisar por nome de usuário
        if (username) {
            const user = await User.findOne({ name: { $regex: username, $options: 'i' } }); // Localizar usuário pelo nome
            if (user) {
                filter.userId = user._id;
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }

        // Pesquisar por palavra-chave no título ou texto
        if (keyword) {
            filter.$or = [
                { titulo: { $regex: keyword, $options: 'i' } },
                { texto: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Buscar os posts com o filtro
        const posts = await Post.find(filter).populate('userId', 'name email'); // Popula os detalhes do usuário

        // Retornar os posts encontrados
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar a pesquisa', error: error.message });
    }
};

async postsRelevantes(req, res) {
    const userId = req.params.id;

  try {
    const perguntasRelevantes = await Post.countDocuments({
      userId: userId,
      $expr: { $gt: [{ $size: "$likes" }, 10] }
    });


    return res.status(200).json({
      perguntasRelevantes
    });
  } catch (error) {
    console.error("Erro ao buscar dados relevantes:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

}

module.exports = new PostController();