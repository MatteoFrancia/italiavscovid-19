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
            document.getElementById("data").innerHTML = "Quadro generale della situazione italiana, aggiornato al " + dati_pcm_dpc[0].data;
        });
}

function storico_nazionale() {
    $.getJSON(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json",
        function (dati_pcm_dpc) {
            $.each(dati_pcm_dpc, function (idx, obj) {
                console.log(obj.data);
                console.log(obj.stato);
                console.log(obj.ricoverati_con_sintomi);
                console.log(obj.terapia_intensiva);
                console.log(obj.totale_ospedalizzati);
                console.log(obj.isolamento_domiciliare);
                console.log(obj.totale_attualmente_positivi);
                console.log(obj.nuovi_attualmente_positivi);
                console.log(obj.dimessi_guariti);
                console.log(obj.deceduti);
                console.log(obj.totale_casi);
                console.log(obj.tamponi);
            });
        });
}