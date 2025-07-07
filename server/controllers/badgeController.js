const User = require('../models/User');
const Post = require('../models/post');

// Função para verificar e atribuir insignias
const updateUserBadges = async (postId) => {
    try {
        // Recuperar o post
        const post = await Post.findById(postId).populate('userId');
        if (!post) {
            throw new Error('Postagem não encontrada');
        }

        const { userId, likes, tags } = post;

        // Níveis de likes para as insignias
        const levels = {
            bronze: 50,
            silver: 150,
            gold: 300,
        };

        // Atualizar insignias do usuário
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        tags.forEach((tag) => {
            const likeCount = likes.length;
            let currentBadge = user.badges.get(tag) || null;

            if (likeCount >= levels.gold && currentBadge !== 'gold') {
                user.badges.set(tag, 'gold');
            } else if (likeCount >= levels.silver && currentBadge !== 'silver' && currentBadge !== 'gold') {
                user.badges.set(tag, 'silver');
            } else if (likeCount >= levels.bronze && !currentBadge) {
                user.badges.set(tag, 'bronze');
            }
        });

        await user.save();
        console.log(`Insignias atualizadas para o usuário ${user.name}`);
    } catch (error) {
        console.error('Erro ao atualizar insignias:', error.message);
    }
};

module.exports = { updateUserBadges };
