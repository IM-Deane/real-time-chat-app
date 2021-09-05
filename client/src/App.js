import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import ChannelList from "./components/ChannelList";
import UserProfile from "./components/UserProfile";
import ChatWindow from "./components/ChatWindow";

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
			<Grid item className={classes.gridItem} xs={5}>
				<ChatWindow />
			</Grid>
			{/* <Grid item className={classes.gridItem} xs={2}>
				<UserProfile />
			</Grid> */}
		</Grid>
	);
}

export default App;
