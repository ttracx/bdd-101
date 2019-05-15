import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Message from ".";
const stories = storiesOf('Notifications', module);
stories.addDecorator(withKnobs);
stories
  .add("A message", () => <Message>{text("Message Text", "Thank you for your email")}</Message>)
  .add("A message with flag", () => <Message newMessage={boolean('newMessage', true)}>Important Message!</Message>)
