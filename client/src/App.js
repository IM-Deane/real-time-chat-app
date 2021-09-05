import React from "react";
import { Typography, AppBar, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ChannelList from "./components/ChannelList";
import VideoPlayer from "./components/VideoPlayer";
import ChatWindow from "./components/ChatWindow";
import Notifications from "./components/Notifications";
import Options from "./components/Options";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		marginTop: "70px",
		padding: "0 25px",
		height: "600px",
		width: "100%",
	},
	gridItem: {
		height: "inherit",
		width: "100%",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<Grid
			container
			className={classes.gridContainer}
			justifyContent="center"
			alignItems="center"
		>
			<Grid item className={classes.gridItem} xs={3}>
				<ChannelList />
			</Grid>
			{/* <Grid item xs={5}>
					<VideoPlayer />
				</Grid> */}
			<Grid item className={classes.gridItem} xs={5}>
				<ChatWindow />
			</Grid>
			<Grid item className={classes.gridItem} xs={2}>
				User Settings
			</Grid>

			{/* <Options>
				<Notifications />
			</Options> */}
		</Grid>
	);
}

export default App;
