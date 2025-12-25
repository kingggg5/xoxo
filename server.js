const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // ใช้ express.json() แทน bodyParser.json()

mongoose.connect('mongodb+srv://king:110431@cluster0.hw2qkqj.mongodb.net/Saved')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const gameSchema = new mongoose.Schema({
    gridSize: Number,
    moves: Array,
    winner: String,
    date: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

app.post('/api/games', async (req, res) => {
    const { gridSize, moves, winner } = req.body;
    const newGame = new Game({ gridSize, moves, winner });
    try {
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
