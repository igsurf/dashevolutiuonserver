// IMPORTS        ///////////////////////
const clients = require('restify-clients');
const config = require('config');

// CONSTANTES     ///////////////////////
const CHAVE_ENDPOINT = 'graficoLinguagens';

/**
 * Classe responsável por chamar as apis de linguagem
 */
class GraficoLinguagens {

    constructor() {
        this.endpoint = config.endpoints.graficoLinguagens;
        this.client = clients.createJsonClient({
            url: config.servidor.url
        });
    }

    chamarAPI() {
        const context = this; //TODO: CODE SMELL, VERIFICAR ALTERNATIVA
        return new Promise(function (resolve, reject) {
            context.client.get(context.endpoint, tratarResposta);            

            /**
             * Callback da requisição
             */
            function tratarResposta(err, req, res, obj)  {
                if (err) reject(err);
                else resolve(res);
            };
        });
    }
}

module.exports = GraficoLinguagens;