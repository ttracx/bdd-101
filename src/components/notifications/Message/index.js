import React from "react"

import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const Message = ({ newMessage, children }) => <ListGroup.Item>
  <span>{children}</span>
  {newMessage && <Badge variant="danger">New</Badge>}
  </ListGroup.Item>

export default Message

