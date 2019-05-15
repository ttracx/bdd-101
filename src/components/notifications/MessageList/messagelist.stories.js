import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import MessageList from ".";

const stories = storiesOf('MessageList', module);
stories.addDecorator(withKnobs);

stories
  .add("A list of messages", () => <MessageList messages={["Reset password request", "You have won a prize!!"]}/>)
