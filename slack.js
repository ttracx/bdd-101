require('dotenv').config()
var slack = require('slack-notify')(process.env.SLACK_WEBHOOK_URL);

console.log(process.env.SLACK_WEBHOOK_URL)
slack.send({
  channel: '#workshop',
  icon_url: '',
  text: 'Test',
  unfurl_links: 1,
  username: 'franz'
});