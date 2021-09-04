import React, { useContext } from "react";

import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
	video: {
		width: "550px",
		[theme.breakpoints.down("xs")]: {
			width: "300px",
		},
	},
	gridContainer: {
		justifyContent: "center",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
	},
	paper: {
		padding: "10px",
		border: "2px solid black",
		margin: "10px",
	},
}));

function VideoPlayer() {
	const {
		thisUserName,
		callAccepted,
		thisUserVideo,
		otherUserVideo,
		callEnded,
		videoStream,
		callSettings,
	} = useContext(SocketContext);
	const classes = useStyles();

	return (
		<Grid container className={classes.gridContainer}>
			{/* Our video */}
			{videoStream && (
				<Paper className={classes.paper}>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{thisUserName || "Name"}
						</Typography>
						<video
							playsInline
							muted
							ref={thisUserVideo}
							autoPlay
							className={classes.video}
						/>
					</Grid>
				</Paper>
			)}
			{/* Their Video */}
			{callAccepted && !callEnded && (
				<Paper className={classes.paper}>
					<Grid item xs={12} md={6}>
						<Typography variant="h5" gutterBottom>
							{callSettings.name || "Name"}
						</Typography>
						<video
							playsInline
							ref={otherUserVideo}
							autoPlay
							className={classes.video}
						/>
					</Grid>
				</Paper>
			)}
		</Grid>
	);
}

export default VideoPlayer;
