// IMPORTS /////
const GitHubAPI = require('../controllers/GitHubAPI');

/**
 * Classe responsável por chamar as apis de linguagem
 */
class GraficoLinguagens {

    constructor() {
        this.github = new GitHubAPI().github;
    }

    chamarAPI() {
        var searchFilter = {
            q: {
                type: "type:org",
                in: "email",
                repos: 1,
                location: "brazil"
            },
            per_page: 100
        };
        return this.github.search.users(searchFilter);
    }
}

module.exports = GraficoLinguagens;