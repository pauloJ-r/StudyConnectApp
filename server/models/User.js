const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    github: {
        type: String,
        default: "",
    },
    linkedin: {
        type: String,
        default: "",
    },
    badges: {
        type: Map, // Chave: tag, Valor: nível da insignia (bronze, prata, ouro)
        of: String,
        default: {},
    },
    course: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
