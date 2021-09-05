import React, { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { SocketContext } from "../SocketContext";

import {
	Button,
	TextField,
	Grid,
	Typography,
	Container,
	Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui//core/styles";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	gridContainer: {
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	container: {
		width: "600px",
		margin: "35px 0",
		padding: 0,
		[theme.breakpoints.down("xs")]: {
			width: "80%",
		},
	},
	margin: {
		marginTop: 20,
	},
	padding: {
		padding: 20,
	},
	paper: {
		padding: "10px 20px",
		border: "2px solid black",
	},
}));

function Options({ children }) {
	const [idToCall, setIdToCall] = useState("");
	const [copied, setCopied] = useState(false);

	const handleCopied = () => {
		setCopied(true);
		// Reset text
		setTimeout(() => {
			setCopied(false);
		}, 5000);
	};

	// Hooks
	const classes = useStyles();
	const {
		thisUser,
		callAccepted,
		callEnded,
		thisUserName,
		setThisUserName,
		leaveCall,
		callUser,
	} = useContext(SocketContext);

	return (
		<Container className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<form className={classes.root} noValidate autoComplete="off">
					<Grid container className={classes.gridContainer}>
						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography gutterBottom variant="h6">
								Account Info
							</Typography>
							<TextField
								label="Display Name"
								value={thisUserName}
								placeholder="Luke Skywalker"
								fullWidth
								onChange={(e) => setThisUserName(e.target.value)}
							/>
							<Typography variant="body1" color="textPrimary">
								Your ID: {thisUser}
							</Typography>
							<CopyToClipboard text={thisUser} className={classes.margin}>
								<Button
									variant="contained"
									color={!copied ? "primary" : "secondary"}
									fullWidth
									onClick={handleCopied}
									startIcon={<Assignment fontSize="large" />}
								>
									{!copied ? "Copy Your ID" : "Copied!"}
								</Button>
							</CopyToClipboard>
						</Grid>
						<Grid item xs={12} md={6} className={classes.padding}>
							<Typography gutterBottom variant="h6">
								Make a Call
							</Typography>
							<TextField
								label="ID to Call"
								value={idToCall}
								fullWidth
								onChange={(e) => setIdToCall(e.target.value)}
								helperText={
									!thisUserName && "Enter a display name before making a call."
								}
								FormHelperTextProps={{ error: true }}
							/>
							{callAccepted && !callEnded ? (
								<Button
									variant="contained"
									color="secondary"
									fullWidth
									className={classes.margin}
									startIcon={<PhoneDisabled fontSize="large" />}
									onClick={leaveCall}
								>
									End Call
								</Button>
							) : (
								<Button
									variant="contained"
									color="primary"
									disabled={!thisUserName}
									fullWidth
									className={classes.margin}
									startIcon={<Phone fontSize="large" />}
									onClick={() => callUser(idToCall)}
								>
									Call
								</Button>
							)}
						</Grid>
					</Grid>
				</form>
				{children}
			</Paper>
		</Container>
	);
}

export default Options;
