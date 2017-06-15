var api={
    url:"https://examen-laboratoria-sprint-5.herokuapp.com/topics"
};
var $listaTemas= $("#listaTemas");

var cargarPagina= function(){
    cargarTemas(); /*Esta funcion muestra los temas que ya estan en la API*/
    //$("#add-form").submit(agregarTema); //Definir la funcion agregarTema   
};

var cargarTemas= function(){
    /*Esta funcion muestra los temas que ya estan en la API*/
    $.getJSON(api.url, function(temas){
        temas.forEach(crearTema);
    });
};

var crearTema = function(tema){
    //Jalo las propiedades que me interesan del objeto temas/topics
    var nombreAutor= tema.author_name;
    var contenido= tema.content;
    var numRespuestas= tema.responses_count;
    //Creo los elementos con DOM, primero filas tr
    var $tr=$("<tr/>");
    //Creo la celda td del nombre de autor
    var $nombreAutorTd=$("<td/>");
    $nombreAutorTd.text(nombreAutor);
    //creo celda de Contenido del Tema
    var $contenidoTd=$("<td/>");
    $contenidoTd.text(contenido);
    
    //Creo la celda del numero de respuestas
    var $numRespuestasTd=$("<td/>");
    $numRespuestasTd.text(numRespuestas);
    
    
    //Metemos las celdas a las filas
    $tr.append($nombreAutorTd);
    $tr.append($contenidoTd);
    $tr.append($numRespuestasTd);
    //Metemos las filas a la tabla
    $listaTemas.append($tr);   
};







$(document).ready(cargarPagina);