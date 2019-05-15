import "@applitools/eyes-cypress/commands";
import "./commands";
import env from "dotenv";
env.config();
var slack = require("slack-notify")(
  "https://hooks.slack.com/services/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"
);

beforeEach(() => {
  cy.eyesOpen({
    appName: "Workshop",
    browser: { width: 800, height: 600 }
  });
});

afterEach(() => {
  const result = cy.eyesClose().debug()
  console.dir(result);
});

Cypress.on("fail", (error, runnable) => {
  // we now have access to the err instance
  // and the mocha runnable this failed on
  console.dir(error);
  if (process.env.CI) {
    slack.send({
      channel: "#workshop",
      title: "Cypress Error",
      icon_url: "https://shedali.d.pr/c822Ln.png",
      text: `${error.message}`,
      unfurl_links: 1,
      username: "franz",
      actions: [
        {
          name: "action",
          type: "button",
          text: "Complete this task",
          style: "",
          value: "complete"
        },
        {
          name: "tags_list",
          type: "select",
          text: "Add a tag...",
          data_source: "static",
          options: [
            {
              text: "Launch Blocking",
              value: "launch-blocking"
            },
            {
              text: "Enhancement",
              value: "enhancement"
            },
            {
              text: "Bug",
              value: "bug"
            }
          ]
        }
      ]
    });
  }
  throw error; // throw error to have test still fail
});