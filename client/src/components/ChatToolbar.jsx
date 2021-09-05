import React from "react";

import VideoPlayer from "./VideoPlayer";
import Notifications from "./Notifications";
import Options from "./Options";
import BadgeAvatar from "./BadgeAvatar";

import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoCallIcon from "@material-ui/icons/VideoCall";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		marginTop: "8px",
		marginBottom: "8px",
		width: "100%",
		height: "100%",
	},
	toolbarIcons: {
		color: "grey",
	},
	chatTitle: {
		display: "flex",
		alignItems: "center",
	},
}));

function ChatToolbar({ user }) {
	const classes = useStyles();

	return (
		<Grid
			container
			justifyContent="space-between"
			alignItems="center"
			className={classes.gridContainer}
		>
			<Grid item xs={7}>
				<span className={classes.chatTitle}>
					<BadgeAvatar user={{ name: "Greg Matthews" }} />
					<Typography variant="h6" style={{ marginLeft: "8px" }}>
						{user.name || "Greg Matthews"}
					</Typography>
				</span>
			</Grid>
			<Grid item xs={5}>
				<Grid
					container
					spacing={1}
					alignItems="center"
					justifyContent="flex-end"
				>
					<Grid item>
						<IconButton aria-label="video call">
							<VideoCallIcon
								fontSize="large"
								className={classes.toolbarIcons}
							/>
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton aria-label="settings">
							<SettingsIcon fontSize="large" className={classes.toolbarIcons} />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ChatToolbar;
