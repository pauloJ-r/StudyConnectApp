const Post = require('../models/post');
const Comentario = require('../models/comentario');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload = require('../config/multer');



class UserController {

    

    async getUsers(req, res) {
        try {
            const users = await User.find({}, '-password'); // Exclui a senha do retorno
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ msg: 'Erro no servidor' });
        }
    };
    async updateUser(req, res) {
        const id = req.params.id;
    const { name, bio, github, linkedin } = req.body;
    const picturePath = req.file ? req.file.path : null; // Obtém o caminho do arquivo

    // Verifique se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        // Primeiro, encontre o usuário para obter o caminho atual da imagem
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Cria um objeto de atualização
        const updateFields = {
            name,
            bio: bio || user.bio,
            picturePath: picturePath || user.picturePath // Use a imagem existente se nenhuma nova imagem for enviada
        };

        // Se `github` for vazio, remova o campo, senão atualize com o valor fornecido
        if (github === '') {
            updateFields.$unset = { github: "" };
        } else {
            updateFields.github = github || user.github;
        }

        // Se `linkedin` for vazio, remova o campo, senão atualize com o valor fornecido
        if (linkedin === '') {
            if (!updateFields.$unset) updateFields.$unset = {};
            updateFields.$unset.linkedin = "";
        } else {
            updateFields.linkedin = linkedin || user.linkedin;
        }

        // Atualiza o usuário com os campos fornecidos ou removendo os campos vazios
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Retorne o documento atualizado
        );

        res.status(200).json({ msg: 'Usuário atualizado com sucesso!', user: updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor ao atualizar o usuário' });
    }
};

    async getUserById(req, res) {
        const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};
    async login(req, res) {
        const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: 'Campos obrigatórios' });
    }

    // Checar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Checar a senha
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ msg: 'Email ou Senha inválida' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);

        // Responder com token e dados do usuário
        res.status(200).json({ 
            msg: 'Autenticação realizada com sucesso', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picturePath: user.picturePath
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};
async register(req, res) {
    try {
        // Use `multer` para processar a imagem antes da lógica do registro
        upload.single('picture')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ msg: 'Erro ao fazer upload da imagem' });
            }

            const { name, email, password, confirmpassword } = req.body;

            if (!name || !email || !password || !confirmpassword) {
                return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
            }
            if (password !== confirmpassword) {
                return res.status(422).json({ msg: 'As senhas não conferem' });
            }

            // Checar se o usuário já existe
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(422).json({ msg: 'E-mail já em uso' });
            }

            // Criar senha criptografada
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Verificar se a imagem foi enviada
            const picturePath = req.file ? req.file.path : null;

            // Criar usuário no banco de dados
            const user = new User({
                name,
                email,
                password: passwordHash,
                picturePath,
            });

            await user.save();
            return res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Erro no servidor' });
    }
}


// Obter os 10 usuários com mais likes (apenas com likes > 0)
async getTopUsersByLikes(req, res) {
    try {
        // Agrega os likes nas postagens
        const postLikes = await Post.aggregate([
            {
                $project: {
                    userId: 1,
                    likesCount: { $size: { $ifNull: ["$likes", []] } } // Contar os likes
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalLikes: { $sum: "$likesCount" }
                }
            }
        ]);

        // Agrega os likes nos comentários
        const commentLikes = await Comentario.aggregate([
            {
                $project: {
                    userId: 1,
                    likesCount: { $size: { $ifNull: ["$likes", []] } } // Contar os likes
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalLikes: { $sum: "$likesCount" }
                }
            }
        ]);

        // Combinar os likes de posts e comentários
        const combinedLikes = {};

        // Adiciona os likes dos posts ao objeto combinado
        postLikes.forEach(({ _id, totalLikes }) => {
            if (!combinedLikes[_id]) combinedLikes[_id] = 0;
            combinedLikes[_id] += totalLikes;
        });

        // Adiciona os likes dos comentários ao objeto combinado
        commentLikes.forEach(({ _id, totalLikes }) => {
            if (!combinedLikes[_id]) combinedLikes[_id] = 0;
            combinedLikes[_id] += totalLikes;
        });

        // Filtrar usuários com likes > 0 e ordenar
        const topUsers = Object.entries(combinedLikes)
            .map(([userId, likes]) => ({ userId, likes }))
            .filter(user => user.likes > 0) // Exclui usuários com 0 likes
            .sort((a, b) => b.likes - a.likes) // Ordena por likes em ordem decrescente
            .slice(0, 5); // Limita aos top 10

        // Buscar os dados dos usuários
        const users = await User.find({ _id: { $in: topUsers.map(u => u.userId) } });

        // Combinar os dados dos usuários com os likes
        const result = topUsers.map(({ userId, likes }) => {
            const user = users.find(u => u._id.toString() === userId);
            return {
                userId,
                name: user?.name || 'Usuário não encontrado',
                email: user?.email || 'N/A',
                likes
            };
        });

        res.status(200).json({ topUsers: result });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os usuários com mais likes', error: error.message });
    }
};
}



module.exports = new UserController();
