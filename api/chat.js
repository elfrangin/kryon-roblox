const express = require("express");

const app = express();
app.use(express.json());

let chat = [];

// Récupérer les messages
app.get("/", (req, res) => {
    res.json({
        messages: chat
    });
});

// Ajouter un message
app.post("/send", (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    if (username && message) {
        chat.unshift({
            username,
            message,
            time: Date.now()
        });

        // Garde seulement les 20 derniers messages
        if (chat.length > 20) {
            chat.pop();
        }
    }

    res.json({ success: true });
});

// Vider le chat (optionnel)
app.post("/clear", (req, res) => {
    chat = [];
    res.json({ success: true });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("KRYON Chat API démarrée sur le port " + PORT);
});
