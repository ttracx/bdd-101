import React from "react";
import Button from "react-bootstrap/Button";
import MessageList from "../notifications/MessageList";



const NotificationCentre = ({ newMessage, children }) => <div>
  <Button data-test="composeButton">Compose</Button>
  <MessageList messages={[1, 2, 3]} />
</div>

export default  NotificationCentre

