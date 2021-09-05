import React from "react";

import { Grid, Typography, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	bubble: {
		backgroundColor: "lightgrey",
		padding: "15px",
		borderRadius: "8%",
		margin: "10px",
	},
	chatText: {
		color: "black",
	},
	fallbackAvatarBg: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
}));

function UserBubble({ message, senderData }) {
	const classes = useStyles();
	return (
		<Grid
			container
			justifyContent="flex-start"
			alignItems="center"
			className={classes.gridContainer}
		>
			<Grid item xs={2}>
				<Avatar
					alt="Other user"
					src={process.env.PUBLIC_URL + "/images/girl-avatar.jpg"}
					className={classes.orange}
				/>
			</Grid>
			<Grid item xs={5} className={classes.bubble}>
				<Typography variant="body2" className={classes.chatText}>
					{message}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default UserBubble;
