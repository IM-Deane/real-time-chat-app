import React, { useState, useContext } from "react";

import ChatMessage from "./ChatMessage";
import ChatToolbar from "./ChatToolbar";
import { SocketContext } from "../SocketContext";

import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		margin: 0,
		width: "100%",
		height: "100%",
	},
	paper: {
		height: "100%",
		padding: "30px",
		border: "2px solid black",
		margin: 0,
	},
	chatWindow: {
		backgroundColor: "rgba(241,245,249)",
		minWidth: "420px",
		minHeight: "75%",
		padding: "25px",
		marginBottom: "15px",
		overflowY: "scroll",
	},
	chatInput: {
		backgroundColor: "rgba(241,245,249)",
	},
}));

function ChatWindow() {
	const [chatInput, setChatInput] = useState("");

	const classes = useStyles();
	const {
		emitNewChatMessage,
		chatMessages,
		setChatMessages,
		thisUser,
		callSettings,
	} = useContext(SocketContext);

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
		<Grid container direction="column" className={classes.gridContainer}>
			<Paper className={classes.paper}>
				<Grid item xs={12} component="header">
					<ChatToolbar user={callSettings} />
				</Grid>
				{/* Window */}
				<Grid item xs={12} className={classes.chatWindow}>
					{chatMessages &&
						chatMessages.map(({ text, id }) => (
							<ChatMessage key={id} message={text} senderData={true} />
						))}
				</Grid>
				<Grid
					container
					spacing={1}
					alignItems="center"
					style={{ justifyContent: "flex-end" }}
				>
					<Grid item xs={10}>
						<TextField
							variant="outlined"
							name="chatInput"
							className={classes.chatInput}
							value={chatInput}
							placeholder="Type something to send..."
							fullWidth
							onChange={handleMessageChange}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							style={{ padding: "14px" }}
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
