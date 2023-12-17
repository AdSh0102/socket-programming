import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("request", (arg1, arg2, callback) => {
        console.log(arg1); // { foo: 'bar' }
        console.log(arg2); // 'baz'
        callback({
            status: "ok",
        });
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
