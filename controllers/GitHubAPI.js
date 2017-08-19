// IMPORTS        ///////////////////////
const GitHubApi = require("github");
const config = require('config');
const Promise = require('bluebird');

class GitHubAPI {

    constructor() { }    

    get github() {
        const gitHubConfig = Object.assign( { Promise: Promise }, config.github);
        return new GitHubApi(gitHubConfig);
    }
}

module.exports = GitHubAPI;