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
            page: 1,
            per_page: 100
        }

        return this.github.repos.getContributors(filter);
    }
}

module.exports = GraficoCommitsPerProject;
