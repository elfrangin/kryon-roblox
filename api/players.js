const express = require("express");

const app = express();
app.use(express.json());

let players = [];

// Liste des joueurs
app.get("/", (req, res) => {
    res.json({
        online: players.length,
        players: players
    });
});

// Joueur rejoint
app.post("/join", (req, res) => {
    const username = req.body.username;

    if (username && !players.includes(username)) {
        players.push(username);
    }

    res.json({ success: true });
});

// Joueur quitte
app.post("/leave", (req, res) => {
    const username = req.body.username;

    players = players.filter(p => p !== username);

    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("KRYON Roblox API démarrée sur le port " + PORT);
});
