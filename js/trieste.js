$(document).ready(function () {
    var data_files = [
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200330_FVG.json",
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200331_FVG.json",
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200401_FVG.json",
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200402_FVG.json",
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200403_FVG.json",
        "https://raw.githubusercontent.com/MatteoFrancia/italiavscovid19/master/assets/data/20200404_FVG.json"
    ];
    var trieste = [];
    var sgonico = [];
    carica_dati_storico_regionale(data_files, trieste, sgonico);
});

function carica_dati_storico_regionale(data_files, trieste, sgonico) {
    $.each(data_files, function (idx, data_file) {
        $.getJSON(
            data_file,
            function (dati_pcm_dpc) {
                $.each(dati_pcm_dpc.municipalities, function (id, obj) {
                    if (obj.name === 'Sgonico') {
                        sgonico.push(obj);
                    } else if (obj.name === 'Trieste') {
                        trieste.push(obj);
                    }
                });
            })
            .done(function () {
                if (trieste.length === data_files.length) {
                    var trieste_date = [];
                    var trieste_storico_positivi = [];
                    trieste.sort((a, b) => (a.values.lu.split(" ")[0].split("/")[2]+a.values.lu.split(" ")[0].split("/")[1]+a.values.lu.split(" ")[0].split("/")[0] > b.values.lu.split(" ")[0].split("/")[2]+b.values.lu.split(" ")[0].split("/")[1]+b.values.lu.split(" ")[0].split("/")[0]) ? 1 : -1);
                    $.each(trieste, function (idx, obj) {
                        trieste_date.push(obj.values.lu.split(" ")[0]);
                        trieste_storico_positivi.push(obj.values.p);
                    });
                    card_riassuntive_trieste(trieste);
                    graficoVariazioneGiornalieraContagiTrieste(trieste_date,trieste_storico_positivi);
                    totaleContagiPerGiornoTrieste(trieste_date,trieste_storico_positivi);
                    
                    var sgonico_date = [];
                    var sgonico_storico_positivi = [];
                    sgonico.sort((a, b) => (a.values.lu.split(" ")[0].split("/")[2]+a.values.lu.split(" ")[0].split("/")[1]+a.values.lu.split(" ")[0].split("/")[0] > b.values.lu.split(" ")[0].split("/")[2]+b.values.lu.split(" ")[0].split("/")[1]+b.values.lu.split(" ")[0].split("/")[0]) ? 1 : -1);
                    $.each(sgonico, function (idx, obj) {
                        sgonico_date.push(obj.values.lu.split(" ")[0]);
                        sgonico_storico_positivi.push(obj.values.p);
                    });
                    card_riassuntive_sgonico(sgonico);
                    
                    //graficoVariazioneGiornalieraContagiTrieste();
                    //totaleContagiPerGiornoTrieste();
                };
            });
    });
}

function card_riassuntive_trieste(trieste) {
    document.getElementById("quarantena").innerHTML = trieste[trieste.length-1].values.q;
    document.getElementById("positivi").innerHTML = trieste[trieste.length-1].values.p;
    document.getElementById("guariti").innerHTML = trieste[trieste.length-1].values.g;
    document.getElementById("morti").innerHTML = trieste[trieste.length-1].values.d;

    quarantena_differenza = trieste[trieste.length-1].values.q - trieste[trieste.length-2].values.q;
    positivi_differenza = trieste[trieste.length-1].values.p - trieste[trieste.length-2].values.p;
    guariti_differenza = trieste[trieste.length-1].values.g - trieste[trieste.length-2].values.g;
    morti_differenza = trieste[trieste.length-1].values.d - trieste[trieste.length-2].values.d;

    document.getElementById("quarantena_differenza").innerHTML = (quarantena_differenza > 0 ? "+" : "") + quarantena_differenza;
    document.getElementById("positivi_differenza").innerHTML = (positivi_differenza > 0 ? "+" : "") + positivi_differenza;
    document.getElementById("guariti_differenza").innerHTML = (guariti_differenza > 0 ? "+" : "") + guariti_differenza;
    document.getElementById("morti_differenza").innerHTML = (morti_differenza > 0 ? "+" : "") + morti_differenza;

    document.getElementById("data").innerHTML = "Provincia di Trieste, aggiornato al " + trieste[trieste.length-1].values.lu.split(" ")[0];
    
    /* for (var i = 0; i < trieste.length; i++) {
        console.log("[" + i + "] " + trieste[i].values.lu.split(" ")[0]);
    }
    console.log("quarantena ==> " + trieste[trieste.length-1].values.q);
    console.log("positivi ==> " + trieste[trieste.length-1].values.p);
    console.log("guariti ==> " + trieste[trieste.length-1].values.g);
    console.log("morti ==> " + trieste[trieste.length-1].values.d);
    console.log("quarantena ieri ==> " + trieste[trieste.length-2].values.q);
    console.log("positivi ieri ==> " + trieste[trieste.length-2].values.p);
    console.log("guariti ieri ==> " + trieste[trieste.length-2].values.g);
    console.log("morti ieri ==> " + trieste[trieste.length-2].values.d);
    console.log(trieste[trieste.length-1].values.q - trieste[trieste.length-2].values.q);
    console.log(trieste[trieste.length-1].values.p - trieste[trieste.length-2].values.p);
    console.log(trieste[trieste.length-1].values.g - trieste[trieste.length-2].values.g);
    console.log(trieste[trieste.length-1].values.d - trieste[trieste.length-2].values.d); */
}

function card_riassuntive_sgonico(sgonico) {
    document.getElementById("quarantena_sgonico").innerHTML = sgonico[sgonico.length-1].values.q;
    document.getElementById("positivi_sgonico").innerHTML = sgonico[sgonico.length-1].values.p;
    document.getElementById("guariti_sgonico").innerHTML = sgonico[sgonico.length-1].values.g;
    document.getElementById("morti_sgonico").innerHTML = sgonico[sgonico.length-1].values.d;

    quarantena_differenza = sgonico[sgonico.length-1].values.q - sgonico[sgonico.length-2].values.q;
    positivi_differenza = sgonico[sgonico.length-1].values.p - sgonico[sgonico.length-2].values.p;
    guariti_differenza = sgonico[sgonico.length-1].values.g - sgonico[sgonico.length-2].values.g;
    morti_differenza = sgonico[sgonico.length-1].values.d - sgonico[sgonico.length-2].values.d;

    document.getElementById("quarantena_differenza_sgonico").innerHTML = (quarantena_differenza > 0 ? "+" : "") + quarantena_differenza;
    document.getElementById("positivi_differenza_sgonico").innerHTML = (positivi_differenza > 0 ? "+" : "") + positivi_differenza;
    document.getElementById("guariti_differenza_sgonico").innerHTML = (guariti_differenza > 0 ? "+" : "") + guariti_differenza;
    document.getElementById("morti_differenza_sgonico").innerHTML = (morti_differenza > 0 ? "+" : "") + morti_differenza;

    document.getElementById("data_sgonico").innerHTML = "Comune di Sgonico, aggiornato al " + sgonico[sgonico.length-1].values.lu.split(" ")[0];
    
    /*for (var i = 0; i < sgonico.length; i++) {
        console.log("[" + i + "] " + sgonico[i].values.lu.split(" ")[0]);
    }
    console.log("quarantena ==> " + sgonico[sgonico.length-1].values.q);
    console.log("positivi ==> " + sgonico[sgonico.length-1].values.p);
    console.log("guariti ==> " + sgonico[sgonico.length-1].values.g);
    console.log("morti ==> " + sgonico[sgonico.length-1].values.d);
    console.log("quarantena ieri ==> " + sgonico[sgonico.length-2].values.q);
    console.log("positivi ieri ==> " + sgonico[sgonico.length-2].values.p);
    console.log("guariti ieri ==> " + sgonico[sgonico.length-2].values.g);
    console.log("morti ieri ==> " + sgonico[sgonico.length-2].values.d);
    console.log(sgonico[sgonico.length-1].values.q - sgonico[sgonico.length-2].values.q);
    console.log(sgonico[sgonico.length-1].values.p - sgonico[sgonico.length-2].values.p);
    console.log(sgonico[sgonico.length-1].values.g - sgonico[sgonico.length-2].values.g);
    console.log(sgonico[sgonico.length-1].values.d - sgonico[sgonico.length-2].values.d); */
}