import React from "react";

import UserBubble from "./UserBubble";
import OtherUserBubble from "./OtherUserBubble";

import Grid from "@material-ui/core/Grid";

function ChatMessage({ message, senderData }) {
	return (
		<>
			{senderData ? (
				<UserBubble message={message} senderData={senderData} />
			) : (
				<OtherUserBubble message={message} senderData={senderData} />
			)}
		</>
	);
}

export default ChatMessage;
