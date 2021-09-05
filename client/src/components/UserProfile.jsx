import React from "react";

import { SocketContext } from "../SocketContext";

import {
	Grid,
	Typography,
	TextField,
	Paper,
	Button,
	Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
	chatInput: {
		backgroundColor: "rgba(241,245,249)",
	},
}));

function UserProfile() {
	const classes = useStyles();
	return (
		<Grid container direction="column" className={classes.gridContainer}>
			<Paper className={classes.paper}>
				{/* Profile Image */}
				<Grid item xs={12} component="header">
					<Avatar
						alt="Current user"
						src={process.env.PUBLIC_URL + "/images/girl-avatar.jpg"}
						className={classes.orange}
					/>
				</Grid>
				<Grid item xs={12}></Grid>
				<Grid item xs={12}>
					Created by Tristan Deane
				</Grid>
			</Paper>
		</Grid>
	);
}

export default UserProfile;
