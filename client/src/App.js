import React from "react";
import { Typography, AppBar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import ChatWindow from "./components/ChatWindow";
import Notifications from "./components/Notifications";
import Options from "./components/Options";

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: "30px 100px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "600px",
		border: "2px solid black",

		[theme.breakpoints.down("xs")]: {
			width: "90%",
		},
	},
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<main className={classes.wrapper}>
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography variant="h2" align="center">
					Loqui Video Chat
				</Typography>
			</AppBar>
			<Grid container justifyContent="center" alignItems="center">
				<Grid item xs={6}>
					<VideoPlayer />
				</Grid>
				<Grid item xs={6}>
					<ChatWindow />
				</Grid>
				<Options>
					<Notifications />
				</Options>
			</Grid>
		</main>
	);
}

export default App;
