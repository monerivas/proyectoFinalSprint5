var api = {
    url: "https://examen-laboratoria-sprint-5.herokuapp.com/topics"
};
var $listaTemas = $("#listaTemas"); /*jala la tabla del HTML*/

var cargarPagina = function () {
    cargarTemas(); /*<----Esta funcion muestra los temas que ya estan en la API*/
    $("#add-form").submit(agregarTemaNuevo); /*<---Esta funcion agrega temas a la data de la API y lo muestra en el HTML desde el formulario que se presenta como un modal*/

    $("#form-busqueda").submit(busquedaTemas); /*<---Esta funcion busca un tema especifico de los temas de la data de la API que yo meti en un arreglo llamado arregloTemas */
};

var cargarTemas = function () {
    /*Esta funcion obtiene/carga los temas que ya estan en la API*/
    $.getJSON(api.url, function (temas) {
        temas.forEach(crearTema);
    });
};

var crearTema = function (tema) {
    /*Esta funcion muestra los temas que fueron obtenidos de la API con la funcion cargarTemas*/

    /*Jalo las propiedades que me interesan del objeto temas/topics*/
    var nombreAutor = tema.author_name;
    var contenido = tema.content;
    var numRespuestas = tema.responses_count;
    /*Creo los elementos con DOM, primero filas tr*/
    var $tr = $("<tr/>");
    /*Creo la celda td del nombre de autor*/
    var $nombreAutorTd = $("<td/>");
    $nombreAutorTd.text(nombreAutor);
    /*creo celda de Contenido del Tema*/
    var $contenidoTd = $("<td/>");
    $contenidoTd.text(contenido);
    /*Creo la celda del numero de respuestas*/
    var $numRespuestasTd = $("<td/>");
    $numRespuestasTd.text(numRespuestas);
    /*Metemos las celdas a las filas*/
    $tr.append($nombreAutorTd);
    $tr.append($contenidoTd);
    $tr.append($numRespuestasTd);
    /*Metemos las filas a la tabla*/
    $listaTemas.append($tr);
};

var agregarTemaNuevo = function (e) {
    /*Esta funcion agrega temas a la data de la API y lo muestra en el HTML*/
    e.preventDefault();
    var nombreAutor = $("#nombre-autor").val();
    var contenido = $("#contenidoTema").val();
    $.post(api.url, {
            "author_name": nombreAutor,
            "content": contenido
        },
        function (tema) {
            crearTema(tema);
            $("#myModal").modal("hide");
        });
};

/*---- Plantillas----*/

var plantillaTema = "<tr>" +
    "<td>__Autor__</td>" +
    "<td>__Tema__</td>" +
    "<td>__#Respuestas__</td>" +
    "</tr>";


/*-------------Busqueda de temas-----*/

var arregloTemas = [];

$.getJSON(api.url, function (temas) {
    temas.forEach(function (tema) {
        arregloTemas.push(tema)
    });
});


var busquedaTemas = function (e) {
    e.preventDefault();

    var criterioBusqueda = $("#inputBusqueda").val().toLowerCase();
    var temasFiltrados = arregloTemas.filter(function (tema) {
        return tema.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
    });

/*    cargarTemas(temasFiltrados);*/
    mostrarTemasFiltrados(temasFiltrados);
    
    console.log("temas filtrados    " + temasFiltrados);
    /*    Si aparecen los temas que cumplen el criterioBusqueda pero no los imprime aun*/
    
 
};

var mostrarTemasFiltrados= function(temasFiltrados){
    var plantillaFinal="";
    temasFiltrados.forEach(function(tema){
      plantillaFinal+= plantillaTema.replace("__Autor__", tema.author_name).replace("__Tema__", tema.content).replace("__#Respuestas__", tema.responses_count);
    });
    
    $("#listaTemas").html("");
    $("#listaTemas").html(plantillaFinal);

}







$(document).ready(cargarPagina);
