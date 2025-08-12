const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    tags: [{
        type: String, // Permite qualquer valor como tag
    }],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
