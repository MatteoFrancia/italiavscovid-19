$(document).ready(function () {
    storico_nazionale();
});

function storico_nazionale() {
    $.getJSON(
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json",
        function (dati_pcm_dpc) {

            var data = [];
            var totale_casi = [];
            var totale_attualmente_positivi = [];
            var nuovi_attualmente_positivi = [];
            var dimessi_guariti = [];
            var deceduti = [];

            $.each(dati_pcm_dpc, function (idx, obj) {
                //2020-02-24T18:00:00
                data.push(obj.data.split("T")[0].split("-")[2] + "/" + obj.data.split(" ")[0].split("-")[1]);
                totale_casi.push(obj.totale_casi);
                totale_attualmente_positivi.push(obj.totale_attualmente_positivi);
                nuovi_attualmente_positivi.push(obj.nuovi_attualmente_positivi);
                dimessi_guariti.push(obj.dimessi_guariti);
                deceduti.push(obj.deceduti);
            });

            card_riassuntive(data, totale_casi, totale_attualmente_positivi, dimessi_guariti, deceduti);
            graficoVariazioneGiornalieraContagi(data, nuovi_attualmente_positivi);
            totaleContagiPerGiorno(data, totale_attualmente_positivi);
        });
}

function card_riassuntive(data, totale_casi, totale_attualmente_positivi, dimessi_guariti, deceduti) {
    totale_casi_oggi = totale_casi[totale_casi.length - 1];
    totale_attualmente_positivi_oggi = totale_attualmente_positivi[totale_attualmente_positivi.length - 1];
    dimessi_guariti_oggi = dimessi_guariti[dimessi_guariti.length - 1];
    deceduti_oggi = deceduti[deceduti.length - 1];

    totale_casi_ieri = totale_casi[totale_casi.length - 2];
    totale_attualmente_positivi_ieri = totale_attualmente_positivi[totale_attualmente_positivi.length - 2];
    dimessi_guariti_ieri = dimessi_guariti[dimessi_guariti.length - 2];
    deceduti_ieri = deceduti[deceduti.length - 2];
    
    totale_casi_differenza = totale_casi_oggi - totale_casi_ieri;
    totale_attualmente_positivi_differenza = totale_attualmente_positivi_oggi - totale_attualmente_positivi_ieri;
    dimessi_guariti_differenza = dimessi_guariti_oggi - dimessi_guariti_ieri;
    deceduti_differenza = deceduti_oggi - deceduti_ieri;

    document.getElementById("totale_casi").innerHTML = totale_casi_oggi;
    document.getElementById("totale_attualmente_positivi").innerHTML = totale_attualmente_positivi_oggi;
    document.getElementById("dimessi_guariti").innerHTML = dimessi_guariti_oggi;
    document.getElementById("deceduti").innerHTML = deceduti_oggi;

    document.getElementById("totale_casi_differenza").innerHTML = (totale_casi_differenza > 0 ? "+" : "") + totale_casi_differenza;
    document.getElementById("totale_attualmente_positivi_differenza").innerHTML = (totale_attualmente_positivi_differenza > 0 ? "+" : "") + totale_attualmente_positivi_differenza;
    document.getElementById("dimessi_guariti_differenza").innerHTML = (dimessi_guariti_differenza > 0 ? "+" : "") + dimessi_guariti_differenza;
    document.getElementById("deceduti_differenza").innerHTML = (deceduti_differenza > 0 ? "+" : "") + deceduti_differenza;

    document.getElementById("data").innerHTML = "Quadro generale della situazione italiana, aggiornato al " + data[data.length - 1];
}