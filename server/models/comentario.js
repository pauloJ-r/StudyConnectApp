const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
}, { timestamps: true });

const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;
