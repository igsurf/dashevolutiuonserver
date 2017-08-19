// IMPORTS /////
const GitHubAPI = require('../controllers/GitHubAPI');

class GraficoCommitsPerProject {

    constructor() {
        this.github = new GitHubAPI().github;
    }

    chamarAPI() {
        var filter = {
            owner: 'facebook',
            repo: 'react',
            since: '2016-08-19T00:00:00',
            until: '2017-08-19T00:00:00'
        }

        return this.github.repos.getCommits(filter);
    }
}

module.exports = GraficoCommitsPerProject;
