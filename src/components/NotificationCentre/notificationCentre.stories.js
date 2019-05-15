import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import NotificaftionCentre from ".";
const stories = storiesOf('NotificationCentre', module);
stories.addDecorator(withKnobs);
stories.add('NotificationCentre', () => {
  return <NotificaftionCentre/>
})


