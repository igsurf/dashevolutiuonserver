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

        var recuperarGraficoRateProjetos = () => {
            var emitirGraficoRateProjetos = (res) => {
                this.rateProject =  res.data;
                this.socket.emit('carregarGraficoRateProjetos', this.rateProject);
            }

            var tratarErro = (error) => {
                this.socket.emit('error', error);
            }

            graficoRateProjetos.chamarAPI()
                .then(emitirGraficoRateProjetos)
                .catch(tratarErro);
        }

        var recuperarGraficoCommitsPerProject = () => {
            var emitirGraficoCommitsPerProject = (res) => {
                this.commitsPerProject = res.data;
                this.socket.emit('carregarCommitsPerProject', this.commitsPerProject);

                console.log(this.commitsPerProject);
            }

            var tratarErro = (error) => {
                this.socket.emit('error', error);
            }

            graficoCommitsPerProject.chamarAPI()
                .then(emitirGraficoCommitsPerProject)
                .catch(tratarErro);
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
