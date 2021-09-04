import React, { useContext } from "react";
import { SocketContext } from "../SocketContext";

import Button from "@material-ui/core/Button";

function Notifications() {
	const { answerCall, callSettings, callAccepted } = useContext(SocketContext);

	return (
		<>
			{callSettings.isRecievedCall && !callAccepted && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<h1 style={{ marginRight: "15px" }}>
						{callSettings.name} is calling:
					</h1>
					<Button variant="contained" color="primary" onClick={answerCall}>
						Accept
					</Button>
				</div>
			)}
		</>
	);
}

export default Notifications;
