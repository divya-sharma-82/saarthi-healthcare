const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Saarthi Healthcare Backend is Working!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Saarthi Healthcare backend is working!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Saarthi backend running at http://localhost:${PORT}`);
});