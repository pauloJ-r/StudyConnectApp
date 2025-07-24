const Comentario = require('../models/comentario');
const { updateUserBadges } = require('../controllers/badgeController');


class ComentarioController {

// Função para criar um novo comentário
async createComentario(req, res) {
    const { texto, userId, postId } = req.body;
    try {
        const comentario = await Comentario.create({ texto, userId, postId });
        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o comentário.' });
    }
};

// Função para buscar todos os comentários de um post
async getComentariosByPost(req, res) {
    const { postId } = req.params;
    try {
        const comentarios = await Comentario.find({ postId }).populate('userId', '-password');
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os comentários do post.' });
    }
};

// Função para buscar todos os comentários de um usuário
async getComentariosByUser(req, res) {
    const { userId } = req.params;
    try {
        const comentarios = await Comentario.find({ userId }).populate('postId');
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os comentários do usuário.' });
    }
};

// Função para remover um comentário
async removeComentario(req, res) {
    const { id } = req.params;
    try {
        const comentario = await Comentario.findByIdAndDelete(id);
        if (!comentario) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }
        res.status(200).json({ message: 'Comentário removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover o comentário.' });
    }
};


// Adicionar ou remover um like
async toggleLike(req, res){
    try {
        const { comentarioId } = req.params;
        const userId = req.user.id; // Supondo que você tenha middleware de autenticação que adiciona `req.user`

        const comentario = await Comentario.findById(comentarioId);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario não encontrado' });
        }

        // Verifica se o usuário já deu like
        const likeIndex = comentario.likes.indexOf(userId);

        if (likeIndex === -1) {
            // Se o usuário não deu like, adiciona o like
            comentario.likes.push(userId);
        } else {
            // Caso contrário, remove o like
            comentario.likes.splice(likeIndex, 1);
        }

        await comentario.save();
        await updateUserBadges(comentarioId, "comentario");


        res.status(200).json({ message: 'Like atualizado com sucesso', likes: comentario.likes });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar like', error: error.message });
    }
};




// Obter a quantidade de likes de um comentario
async getLikesCount(req, res){
    try {
        const { comentarioId } = req.params;

        const comentario = await Comentario.findById(comentarioId);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario não encontrado' });
        }

        // Retorna a quantidade de likes
        res.status(200).json({ comentarioId: comentario._id, likesCount: comentario.likes.length });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter a quantidade de likes', error: error.message });
    }
};
async comentariosRelevantes(req, res) {
    const userId = req.params.id;

  try {
    // Contar comentários relevantes (mais de 10 likes)
    const respostasRelevantes = await Comentario.countDocuments({
      userId: userId,
      $expr: { $gt: [{ $size: "$likes" }, 10] }
    });

    return res.status(200).json({
      respostasRelevantes
    });
  } catch (error) {
    console.error("Erro ao buscar dados relevantes:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}


}

module.exports = new ComentarioController();