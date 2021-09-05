const path = require("path");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
	res.status(200).send("Hello from your friendly server!");
});

// Serve the site on production deployment
// app.get("/*", (req, res) => {
// 	res.status(200).sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

// TODO: Address issue with sockets not connecting
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	socket.emit("user", socket.id);

	socket.on("chat-message", (message, recipientId, callback) => {
		console.log(message);
		callback({
			status: "ok",
		});
		socket.broadcast.emit("chat-message", message);
	});

	socket.on("call-user", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("call-user", { signal: signalData, from, name });
	});

	socket.on("answer-call", (data) => {
		io.to(data.to).emit("call-accepted", data.signal);
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("call-ended");
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
