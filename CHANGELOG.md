# Version History

**Version 0.0.8:**

Created basic text chat functionality. For the moment, when a message is
submitted it is broadcast to all users on the server - besides the sender of
course.

I now plan to refactor the app UI into a more functional dashboard.

After these changes have been implemented, I will expand upon the text chat.

**Version 0.0.7:**

Began implementing a basic text chat UI.

The end goal of this feature will be to allow users to send simple text messages
to each other. This would provide an alternative path for those with video/audio
connection issues.

**Version 0.0.6:**

**Major:**

- Deployed a test site to:
  [https://loqui-chat.herokuapp.com/](https://loqui-chat.herokuapp.com/)

_Minor:_

Fixed an error that was causing the video to continually rerender. It turns out
the video stream was listed as a dependency of useEffect().. ooops!

**Version 0.0.5:**

Added additional styling and functionality to video control panel. Users must
now enter a display name before a call can be created.

**Version 0.0.4:**

- Added a call control panel that allows users to enter their name, copy their
  callerId to their clipboard, and make/end a video call.

- Created notification alert that will render an Accept/Decline button when a
  call is incoming.

**Version 0.0.3:**

Created video player component that renders each users video stream.

**Version 0.0.2:**

Added styling to home page.

Implemented client socket functionality. React.Context was used to serve the
settings to the rest of the app.

**Version 0.0.1:**

Created basic boilerplate for client and server.
