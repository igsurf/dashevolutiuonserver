// IMPORTS        ///////////////////////
const GraficoLinguagens = require('../endpoints/graficoLinguagens');
const config = require('config');

// IMPLEMENTATION //////////////////////
/**
 * Classe responsável por controlar os sockets
 */
class Dashboard {

    constructor(socket) {
        this.socket = socket;
        this.intervalo = config.intervalo;
    }

    iniciar() {
        var that = this;
        const graficoLinguagens = new GraficoLinguagens();

        function recuperarGraficoLinguagens() {
            graficoLinguagens.chamarAPI()
                .then(emitirGraficoLinguagens)
                .catch(tratarErro);

            function emitirGraficoLinguagens(resposta) {
                that.socket.broadcast.emit('carregarGraficoLinguagens', resposta);
                that.socket.emit('carregarGraficoLinguagens', resposta);
            }

            function tratarErro(error) {
                that.socket.emit('error', error);
            }   
        }

        setInterval(refrescarAPIs, this.intervalo);

        function refrescarAPIs() {
            recuperarGraficoLinguagens();
        }
    }
}

module.exports = Dashboard;