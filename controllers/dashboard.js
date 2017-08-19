// IMPORTS        ///////////////////////
const GraficoRateProjetos = require('../endpoints/graficoRateProtejos');
const GraficoCommitsPerProject = require('../endpoints/graficoCommitsPerProject');
const config = require('config');

// IMPLEMENTATION //////////////////////
/**
 * Classe responsável por controlar os sockets
 */
class Dashboard {
    constructor(socket) {
        this.socket = socket;
        this.intervalo = config.intervalo;
        this.rateProject = {};
        this.commitsPerProject = {};

        this.getInfo();
    }

    getInfo() {
        const graficoRateProjetos = new GraficoRateProjetos();
        const graficoCommitsPerProject = new GraficoCommitsPerProject();

        function recuperarGraficoRateProjetos() {
            graficoRateProjetos.chamarAPI()
                .then(emitirGraficoRateProjetos)
                .catch(tratarErro);

            var emitirGraficoRateProjetos = (res) => {
                this.rateProject =  res.data;
                this.socket.emit('carregarGraficoRateProjetos', this.rateProject);
            }

            var tratarErro = (error) => {
                this.socket.emit('error', error);
            }
        }

        function recuperarGraficoCommitsPerProject() {
            graficoCommitsPerProject.chamarAPI()
                .then(emitirGraficoCommitsPerProject)
                .catch(tratarErro);

            var emitirGraficoCommitsPerProject = (res) => {
                this.commitsPerProject = res.data;
                this.socket.emit('carregarCommitsPerProject', this.commitsPerProject);
            }

            var tratarErro = (error) => {
                this.socket.emit('error', error);
            }
        }

        setInterval(refreshAPIs, this.intervalo);

        function refreshAPIs() {
            recuperarGraficoRateProjetos();
            recuperarGraficoCommitsPerProject();
        }

        refreshAPIs();
    }

    iniciar() {
        this.socket.emit('carregarGraficoRateProjetos', this.rateProject);
        this.socket.emit('carregarCommitsPerProject', this.commitsPerProject);
    }
}

module.exports = Dashboard;
