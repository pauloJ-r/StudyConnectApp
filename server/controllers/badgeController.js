const Post = require("../models/post");
const Comentario = require("../models/comentario");
const User = require("../models/User");

async function updateUserBadges(contentId, type = "post") {
  try {
    let userId, tag;

    if (type === "post") {
      const post = await Post.findById(contentId);
      if (!post || !post.tags || post.tags.length === 0) return;
      if (post.likes.length < 30) return;

      userId = post.userId;
      tag = post.tags[0]; // Considera apenas a primeira tag

    } else if (type === "comentario") {
      const comentario = await Comentario.findById(contentId).populate("postId");
      if (!comentario || !comentario.postId || !comentario.postId.tags || comentario.postId.tags.length === 0) return;
      if (comentario.likes.length < 30) return;

      userId = comentario.userId;
      tag = comentario.postId.tags[0]; // Herda tag do post
    }

    const user = await User.findById(userId);
    if (!user) return;

    // Atualizar a contagem do troféu
    const currentCount = user.badges.get(tag) || 0;
    user.badges.set(tag, currentCount + 1);

    await user.save();
  } catch (error) {
    console.error("Erro ao atualizar badges:", error);
  }
}

// get na quantidade de trolféus de um usuário


async function getUserBadgesCount(req, res) {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    let totalBadges = 0;

    // Se user.badges for um Map, converta para objeto antes:
    const badges = user.badges instanceof Map ? Object.fromEntries(user.badges) : user.badges;

    // Somando os valores dos badges
    for (const key in badges) {
      totalBadges += parseInt(badges[key]);
    }

    return res.json({ totalBadges }); // ✅ retorno JSON correto
  } catch (error) {
    console.error("Erro ao obter contagem de badges:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}




// get quantos badges um usuário tem no total
async function getUserBadges(req, res) {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const badges = Array.from(user.badges.entries()).map(([tag, count]) => ({ tag, count }));
        return res.status(200).json(badges);
    } catch (error) {
        console.error("Erro ao obter badges do usuário:", error);
        return res.status(500).json({ message: 'Erro ao obter badges do usuário' });
    }
}

module.exports = { updateUserBadges, getUserBadgesCount, getUserBadges };
