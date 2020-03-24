$(document).ready(function () {
    odierno_nazionale();
    storico_nazionale();
});

function odierno_nazionale() {
    $.getJSON(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json",
        function (dati_pcm_dpc) {
            document.getElementById("totale_casi").innerHTML = dati_pcm_dpc[0].totale_casi;
            document.getElementById("totale_attualmente_positivi").innerHTML = dati_pcm_dpc[0].totale_attualmente_positivi;
            document.getElementById("dimessi_guariti").innerHTML = dati_pcm_dpc[0].dimessi_guariti;
            document.getElementById("deceduti").innerHTML = dati_pcm_dpc[0].deceduti;
            nuova_data = dati_pcm_dpc[0].data.split(" ")[0].split("-")[2] + "/" + dati_pcm_dpc[0].data.split(" ")[0].split("-")[1] + "/" + dati_pcm_dpc[0].data.split(" ")[0].split("-")[0]
            document.getElementById("data").innerHTML = "Quadro generale della situazione italiana, aggiornato al " + nuova_data + ", ore " + dati_pcm_dpc[0].data.split(" ")[1];
        });
}

function storico_nazionale() {
    $.getJSON(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json",
        function (dati_pcm_dpc) {

            var data = [];
            var totale_casi = [];
            var totale_attualmente_positivi = [];
            var nuovi_attualmente_positivi = [];

            $.each(dati_pcm_dpc, function (idx, obj) {
                data.push(obj.data.split(" ")[0].split("-")[2] + "/" + obj.data.split(" ")[0].split("-")[1]);
                totale_casi.push(obj.totale_casi);
                totale_attualmente_positivi.push(obj.totale_attualmente_positivi);
                nuovi_attualmente_positivi.push(obj.nuovi_attualmente_positivi);
            });
            
            graficoVariazioneGiornalieraContagi(data, nuovi_attualmente_positivi);
            totaleContagiPerGiorno(data,totale_attualmente_positivi);

            /* console.log(data_map); */
            /* console.log(totale_casi_map); */
            /* console.log(totale_attualmente_positivi_map); */
            /* console.log(nuovi_attualmente_positivi_map); */
            /* console.log("============="); */
        });
}