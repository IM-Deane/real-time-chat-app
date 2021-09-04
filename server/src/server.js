const app = require("express")();
const httpServer = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.status(200).send("Hello from your friendly server!");
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
