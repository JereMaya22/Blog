// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configuración
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Definir esquema de publicación
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', postSchema);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const { token, title, content } = req.body;
    if (token !== process.env.SECRET_TOKEN) return res.status(401).send('No autorizado');
    const post = new Post({ title, content });
    await post.save();
    res.status(201).json(post);
});

app.delete('/posts/:id', async (req, res) => {
    const { token } = req.body;
    if (token !== process.env.SECRET_TOKEN) return res.status(401).send('No autorizado');
    await Post.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
