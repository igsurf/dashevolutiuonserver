// IMPORTS        ///////////////////////
const GraficoLinguagens = require('../endpoints/graficoLinguagens');

// IMPLEMENTATION //////////////////////
/**
 * Classe responsável por controlar os sockets
 */
class Dashboard {

    constructor(socket) {
        this.socket = socket;
        this.intervalo = 10000;
    }

    iniciar() {
        const graficoLinguagens = new GraficoLinguagens();

        function recuperarGraficoLinguagens() {
            graficoLinguagens.chamarAPI()
                .then(emitirGraficoLinguagens)
                .catch(tratarErro);

            function emitirGraficoLinguagens(resposta) {
                this.socket.broadcast.emit('carregarGraficoLinguagens', resposta);
                this.socket.emit('carregarGraficoLinguagens', resposta);
            }

            function tratarErro(error) {
                console.log(error);
            }   
        }

        setInterval(refrescarAPIs, this.intervalo);

        function refrescarAPIs() {
            recuperarGraficoLinguagens();
        }
    }
}

module.exports = Dashboard;