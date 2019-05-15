import React from "react"
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../Message";

const MessageList = ({ messages }) => <ListGroup data-test="message-list">
  {messages && messages.map((m, i) => {
    return <Message key={i}>{m}</Message>
  })}
</ListGroup>

export default MessageList