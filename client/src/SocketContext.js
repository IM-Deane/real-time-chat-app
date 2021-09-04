import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// TODO: UPDATE CLIENT URL
// production: https://loqui-chat.herokuapp.com/
const socket = io("https://loqui-chat.herokuapp.com/");

const ContextProvider = ({ children }) => {
	const [videoStream, setVideoStream] = useState(null);
	const [thisUser, setThisUser] = useState("");
	const [callSettings, setCallSettings] = useState({});
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [thisUserName, setThisUserName] = useState("");

	const thisUserVideo = useRef();
	const otherUserVideo = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		// Enable access to browser video and audio devices
		/* ***IMPORTANT NOTE: getUserMedia() will throw an error of type undefined 
		    if connection isn't secure (https)
		*/
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				// Create live video stream
				setVideoStream(currentStream);

				thisUserVideo.current.srcObject = currentStream;
			})
			.catch((error) => {
				console.log(error);
				if (error.toString().includes("Permission denied")) {
					console.log(
						"For this app to work, it must be allowed to access your video and audio."
					);
				}
			});

		socket.on("user", (id) => setThisUser(id));

		socket.on("call-user", ({ from, name: callerName, signal }) => {
			setCallSettings({ isRecievedCall: true, from, name: callerName, signal });
		});
	}, [videoStream]);

	const answerCall = () => {
		setCallAccepted(true);

		// Video call
		const peer = new Peer({ initiator: false, trickle: false });

		peer.on("signal", (data) => {
			socket.emit("answer-call", { signal: data, to: callSettings.from });
		});

		peer.on("stream", (currentStream) => {
			otherUserVideo.current.srcObject = currentStream;
		});

		// Adds user settings to call
		peer.signal(callSettings.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		// Video call
		const peer = new Peer({ initiator: true, trickle: false });

		peer.on("signal", (data) => {
			socket.emit("call-user", {
				userToCall: id,
				signalData: data,
				from: thisUser,
				name: thisUserName,
			});
		});

		peer.on("stream", (currentStream) => {
			otherUserVideo.current.srcObject = currentStream;
		});

		socket.on("call-accepted", (signal) => {
			setCallAccepted(true);

			peer.signal(signal);
		});
		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();

		// Reset page and allow user to make new call
		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				callSettings,
				callAccepted,
				thisUserVideo,
				otherUserVideo,
				videoStream,
				thisUserName,
				setThisUserName,
				callEnded,
				thisUser,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
