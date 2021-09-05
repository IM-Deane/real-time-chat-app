import React from "react";

import { Grid, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import BadgeAvatar from "./BadgeAvatar";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		width: "100%",
		padding: "0 12px",
		margin: "15px 0",
	},
	userNameText: {
		fontWeight: "bold",
	},
	subtitleText: {
		color: "grey",
	},
}));

function Channel({ user }) {
	const classes = useStyles();
	return (
		<Grid
			container
			spacing={4}
			justifyContent="space-evenly"
			className={classes.gridContainer}
		>
			<Grid item xs={2}>
				<BadgeAvatar user={user} />
			</Grid>
			<Grid item xs={8}>
				<Typography variant="body1" className={classes.userNameText}>
					{user.name}
				</Typography>
				<Typography variant="caption" className={classes.subtitleText}>
					Been a minute!
				</Typography>
			</Grid>
			{/* TODO: Notification & time msg was sent */}
			<Grid item xs={2}>
				<Badge badgeContent={4} color="primary" />
			</Grid>
		</Grid>
	);
}

export default Channel;
