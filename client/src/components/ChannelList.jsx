import React, { useState, useEffect } from "react";

import Channel from "./Channel";

import {
	Grid,
	Typography,
	TextField,
	Paper,
	InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		margin: 0,
		width: "80%",
		height: "100%",
		border: "2px solid black",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		overflowY: "scroll",
	},
	searchContainer: {
		margin: "25px 0",
		backgroundColor: "rgba(241,245,249)",
	},
	paper: {
		width: "100%",
		padding: "0 20px",
	},
}));

function ChannelList() {
	const [users, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const classes = useStyles();

	const handleSearchQuery = (e) =>
		setSearchQuery(e.target.value.toLowerCase().trim());

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchQuery)
	);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setUsers(users))
			.catch((err) => console.error(err));
	}, []);

	return (
		<Grid container className={classes.gridContainer}>
			<Paper className={classes.paper}>
				<Grid
					component="header"
					className={classes.searchContainer}
					item
					xs={12}
				>
					<TextField
						variant="outlined"
						name="searchInput"
						value={searchQuery}
						placeholder="Search users"
						fullWidth
						onChange={handleSearchQuery}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon color="disabled" />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user, idx) => <Channel key={idx} user={user} />)
					) : (
						<Typography variant="h6">No users found.</Typography>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default ChannelList;
