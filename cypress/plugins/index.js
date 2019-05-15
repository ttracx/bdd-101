require('dotenv').config()
const cucumber = require('cypress-cucumber-preprocessor').default

const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig("cypress-cucumber-preprocessor");

const searchedFor = explorer.searchSync();
const loaded = explorer.loadSync("./package.json");

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}

require('@applitools/eyes-cypress')(module);
