// Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
}));

// Config JSON response
app.use(express.json());
const path = require('path');

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rotas
const userRoutes = require('./routes/user');
const postRouter = require('./routes/post');
const comentarioRouter = require('./routes/comentario');
const pictureRouter = require("./routes/picture");


app.use(userRoutes);
app.use('/posts',postRouter);
app.use('/comentarios', comentarioRouter);
app.use('/pictures', pictureRouter);

  

// Rota Pública
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo à nossa API' });
});



// Conectando ao banco
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.4d7wmcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000, '0.0.0.0', () => {
            console.log('Conectado ao banco!');
        });
    })
    .catch((err) => console.log(err));
