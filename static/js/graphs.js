/*
queue()
    .defer(d3.json, './static/pobreza-lat-lng-2015.json')
    .await(makeGraphs);
*/
allDim = null;
entidadDim = null;
municipioDim = null;

entidadChart = null;
municipioChart = null;
poblacionPobrezaDisplay = null;

ndx = null;

function makeGraphs(recordsJson) {
    // Crea una instancia del crossfilter
    ndx = crossfilter(recordsJson);

    // Define las dimensiones
    allDim = ndx.dimension(function (d) {
        return d;
    });
    entidadDim = ndx.dimension(function (d) {
        return d.entidad_federativa;
    });
    municipioDim = ndx.dimension(function (d) {
        return d.municipio;
    });

    entidadChart = dc.rowChart("#entidad-chart");
    municipioChart = dc.rowChart("#municipio-chart");
    poblacionPobrezaDisplay = dc.numberDisplay("#poblacion-pobreza");

    graficasPorDimension(ndx, 'pobreza_pob');
    graficaMapa();
};

function cambiaDimension(tipoPobreza) {
    graficasPorDimension(ndx, tipoPobreza);
}

function graficasPorDimension(ndx, tipoPobreza) {
    // Agrupaciones de Datos
    var pobrezaPorEntidad = entidadDim.group().reduceSum(function(d) {
        return +d[tipoPobreza];
    });
    var pobrezaPorMunicipio = municipioDim.group().reduceSum(function(d) {
        return +d[tipoPobreza];
    });
    var pobrezaNacional = allDim.group().reduceSum(function (d) {
        return +d[tipoPobreza];
    });

    // Gráficas
    poblacionPobrezaDisplay
        .formatNumber(d3.format(","))
        .valueAccessor(function (d) {
            return d.value;
        })
        .group(pobrezaNacional);

    entidadChart
        .width(400)
        .height(800)
        .dimension(entidadDim)
        .group(pobrezaPorEntidad)
        .ordering(function (d) {
            return -d.value
        })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

    municipioChart
        .width(400)
        .height(pobrezaPorMunicipio.all().length * 22)
        .dimension(municipioDim)
        .group(pobrezaPorMunicipio)
        .ordering(function (d) {
            return -d.value
        })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

    dc.renderAll();
}

function graficaMapa() {
    var map = L.map('map');

    var drawMap = function () {
        map.setView([19.4326018, -99.1332049], 4);

        L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
				maxZoom: 19
			}).addTo(map);

        // HeatMap
        var geoData = [];
        _.each(allDim.top(Infinity), function (d) {
            geoData.push([d.latitud, d.longitud, d.pobreza]);
        });
        var heat = L.heatLayer(geoData, {
            radius: 10,
            blur: 18,
            maxZoom: 1,
        }).addTo(map);

    };

    // Se dibuja el mapa.
    drawMap();

    // Actualizar el mapa de calor si cualquier gráfico dc es filtrado.
    dcCharts = [entidadChart, municipioChart];

    _.each(dcCharts, function (dcChart) {
        dcChart.on("filtered", function (chart, filter) {
            map.eachLayer(function (layer) {
                map.removeLayer(layer)
            });
            drawMap();
        });
    });
}

// Función que construye el despligue de gráficas inicial.
// recordsJson: variable que se encuentra en el archivo 'pobreza-lat-lng-2015.json'.
makeGraphs(recordsJson);
