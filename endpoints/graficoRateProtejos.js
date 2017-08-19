// IMPORTS /////
const GitHubAPI = require('../controllers/GitHubAPI');

/**
 * Classe responsável por chamar as apis de rate de projetos
 */
class GraficoRateProjetos {

    constructor() {
        this.github = new GitHubAPI().github;
    }

    chamarAPI() {
        var searchFilter =
         {
            q: "stars:>50000",
            sort:"stars",
            order:"desc"
         };

        return this.github.search.repos(searchFilter);
    }
}

module.exports = GraficoRateProjetos;