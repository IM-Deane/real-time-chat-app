import React, { useState, useContext } from "react";

import ChatMessage from "./ChatMessage";
import { SocketContext } from "../SocketContext";

import { Grid, Typography, TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		width: "100%",
		minHeight: "320px",
		justifyContent: "center",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	paper: {
		padding: "30px",
		border: "2px solid black",
		margin: "10px",
	},
	chatWindow: {
		minWidth: "420px",
		minHeight: "325px",
		padding: "25px",
		border: "1px solid grey",
		borderRadius: "4%",
		marginBottom: "15px",
	},
}));

function ChatWindow() {
	const [chatInput, setChatInput] = useState("");

	const classes = useStyles();
	const { emitNewChatMessage, chatMessages, setChatMessages, thisUser } =
		useContext(SocketContext);

	const handleMessageChange = (e) => setChatInput(e.target.value);

	const handleSubmitMessage = () => {
		const newMessage = {
			text: chatInput,
			messageId: chatMessages.length * 2,
			senderId: thisUser,
		};

		setChatMessages([...chatMessages, newMessage]);
		emitNewChatMessage(newMessage, thisUser);
		setChatInput("");
	};

	return (
		<Grid container spacing={3} className={classes.gridContainer}>
			<Paper className={classes.paper}>
				<Grid item xs={12} component="header">
					<Typography variant="h6" gutterBottom>
						{}
					</Typography>
				</Grid>
				{/* Window */}
				<Grid item xs={12} className={classes.chatWindow}>
					{chatMessages &&
						chatMessages.map(({ text, id }) => (
							<ChatMessage key={id} message={text} senderData={true} />
						))}
				</Grid>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={8}>
						<TextField
							variant="outlined"
							name="chatInput"
							value={chatInput}
							placeholder="Type something to send..."
							fullWidth
							onChange={handleMessageChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={handleSubmitMessage}
							endIcon={<SendIcon />}
						>
							Send
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default ChatWindow;
