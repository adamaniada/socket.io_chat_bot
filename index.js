const { Socket } = require('socket.io');

const app = require("express")();

const http = require("http").createServer(app);

const io = require('Socket.io')(http);


app.get("/", (req, res) => {
    // console.log(req);
    // res.send("Bonjour");
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    // console.log(socket);
    // console.log(socket.id);
    console.log("Une connection s'active");

    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est deconnecter");
    });

    // On gere le chat
    socket.on("chat_message", (msg) => {
        io.emit("receive_message", msg);
    });
});

http.listen(3000, () => {
    console.log("j'ecoute sur le port 3000");
});