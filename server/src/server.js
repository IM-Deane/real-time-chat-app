const path = require("path");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
	res.status(200).send("Hello from your friendly server!");
});

// Serve the site on production deployment
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

io.on("connection", (socket) => {
	socket.emit("user", socket.id);

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
