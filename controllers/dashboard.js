// IMPORTS        ///////////////////////
const GraficoLinguagens = require('../endpoints/graficoLinguagens');
const GraficoRateProjetos = require('../endpoints/graficoRateProtejos');
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
        const graficoRateProjetos = new GraficoRateProjetos();

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

        function recuperarGraficoRateProjetos() {
            graficoRateProjetos.chamarAPI()
                .then(emitirGraficoRateProjetos)
                .catch(tratarErro);

            function emitirGraficoRateProjetos(resposta) {
                that.socket.broadcast.emit('carregarGraficoRateProjetos', resposta);
                that.socket.emit('carregarGraficoRateProjetos', resposta);
            }

            function tratarErro(error) {
                that.socket.emit('error', error);
            }   
        }

        setInterval(refrescarAPIs, this.intervalo);

        function refrescarAPIs() {
            // recuperarGraficoLinguagens();
            recuperarGraficoRateProjetos();
        }
    }
}

module.exports = Dashboard;