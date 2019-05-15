require('dotenv').config()
var getRepoInfo = require("git-repo-info");
var info = getRepoInfo();
console.dir(info);
const test_identifier =
  "CY:" +
  info.author.match(/[\w.]*[*^@]/).pop() +
  ":" +
  info.branch +
  ":" +
  info.abbreviatedSha;

module.exports = {
  branchName: info.branch,
  batchName: test_identifier,
  browser: [
    {width: 800, height: 600, name: 'firefox'},
    {width: 1024, height: 768, name: 'chrome'},
  ]
};
