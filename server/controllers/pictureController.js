const User = require("../models/User");
const fs = require("fs");

// Salvar imagem e associar a um usuário
exports.create = async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.file;

        // Verificar se o usuário existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        // Atualizar o caminho da imagem no usuário
        user.picturePath = file.path;
        await user.save();

        res.json({ user, msg: "Imagem salva e associada ao usuário com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar imagem." });
    }
};

// Buscar todas as imagens (não é necessário neste caso, pois as imagens estão associadas aos usuários)

// Remover imagem
exports.remove = async (req, res) => {
    try {
        const { userId } = req.body;

        // Verificar se o usuário existe
        const user = await User.findById(userId);
        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Remover a imagem do sistema de arquivos
        if (user.picturePath) {
            try {
                fs.unlinkSync(user.picturePath);
                console.log("Imagem removida do sistema de arquivos");
            } catch (err) {
                console.error("Erro ao remover a imagem do sistema de arquivos:", err);
                return res.status(500).json({ message: "Erro ao excluir imagem do sistema de arquivos." });
            }
        } else {
            console.log("Nenhuma imagem para remover");
        }

        // Limpar o campo picturePath do usuário
        user.picturePath = "";
        await user.save();

        res.json({ message: "Imagem removida e campo picturePath atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir imagem:", error);
        res.status(500).json({ message: "Erro ao excluir imagem." });
    }
};