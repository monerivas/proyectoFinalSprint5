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
    //Creo los elementos con DOM, primero filas
    var $tr=$("<tr/>");
    //Creo la celda del nombre de autor
    var $nombreAutorTd=$("<td/>");
    $nombreAutorTd.text(nombreAutor);
    //creo celda de Contenido del Tema
    var $contenidoTd=$("<td/>");
    $contenidoTd.text(contenido);
    //Metemos las celdas a las filas
    $tr.append($nombreAutorTd);
    $tr.append($contenidoTd);
    //Metemos las filas a la tabla
    $listaTemas.append($tr);   
};







$(document).ready(cargarPagina);