var pelicula;
function buscar(){
    let peliculaBuscar = document.getElementById("busqueda").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Aquí dentro haces las cosas que quieras hacer con los datos que consigues de la API. Por ejemplo un console.log()
            //console.log(xhttp.responseText);
            // Esto te devuelve las cosas como texto plano si no me equivoco, así que tendrías que hacerle un JSON.parse()
            // También puedes llamar a una función que hayas definido en otro lado y pasarle el xhttp.responseText como argumento
            pelicula = JSON.parse(xhttp.responseText);
            borrar();
            maquetaRespuesta(pelicula);
            //console.log(pelicula);
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?apikey=5f2a0e9a&t="+peliculaBuscar+"", true); // Aquí está puesto un ejemplo de llamada a la API, tienes que poner lo que necesites. En este caso es buscar las pelis que se llamen Titanic
    xhttp.send(); // Cuando llamas al send se lanza la petición y se ejecuta lo de xhttp.onreadystatechange
}

function borrar(){
    let contenedor = document.getElementById("peliculas");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.lastChild);
    }
}

function maquetaRespuesta(pelicula){
    var div=document.createElement("div");
    div.style.display="flex";
    div.style.flexDirection="column";
    div.style.margin="40px";
    div.style.height="fit-content";
    div.style.width="20%";
    div.style.boxSizing="border-box";

    var ventanaModal = document.createElement("a");
    ventanaModal.setAttribute("href", "javascript: mostrarDatos(pelicula)");

    var image=document.createElement("img");
    if(pelicula.Poster == "N/A"){
        image.src= "Imagenes/imagen-no-disponible.jpg";
        image.style.borderRadius="5px";
        image.style.height="450px";
        image.style.paddingBottom="5px";
        image.style.width= "300px";
    } else{
        image.src= pelicula.Poster;
    }

    image.style.borderRadius="5px";
    image.style.height="450px";
    image.style.paddingBottom="5px";
    
    var nombrePelicula=document.createElement("p");
    nombrePelicula.innerText=pelicula.Title;
    nombrePelicula.style.textAlign="center";
    nombrePelicula.style.color="black";
    nombrePelicula.style.width="70%";
    nombrePelicula.style.margin="auto";
    nombrePelicula.style.marginBottom="20px";
    nombrePelicula.style.marginTop="20px";

    ventanaModal.appendChild(image);
    div.appendChild(ventanaModal);
    div.appendChild(nombrePelicula);
    document.getElementById("peliculas").append(div);
}

function mostrarDatos(pelicula){
    document.getElementById("ventanaModal").style.display="block";

    var headerVentana = document.createElement("div");
    var bodyVentana = document.createElement("div");
    let imagenPortada = document.createElement("div");
    let datosPelicula = document.createElement("div");
    let tituloPelicula = document.createElement("p");
    let cerrar = document.createElement("img");
    let cerrarVentana = document.createElement("a");
    let portadaPelicula = document.createElement("img");
    let released = document.createElement("p");
    let country = document.createElement("p");
    let runtime = document.createElement("p");
    let genre = document.createElement("p");
    let director = document.createElement("p");
    let language = document.createElement("p");
    let production = document.createElement("p");
    let imdbRating = document.createElement("p");
    let separador = document.createElement("hr");
    let plot = document.createElement("p");

    released.innerText = "Released: "+pelicula.Released;
    country.innerText = "Country: "+pelicula.Country;
    runtime.innerText = "Runtime: "+pelicula.Runtime;
    genre.innerText = "Genre: "+pelicula.Genre;
    director.innerText = "Director: "+pelicula.Director;
    language.innerText = "Language: "+pelicula.Language;
    production.innerText = "Production: "+pelicula.Production;
    imdbRating.innerText = "Rating: "+pelicula.imdbRating+"/10";
    plot.innerText = pelicula.Plot;

    bodyVentana.setAttribute("id", "bodyVentana");
    headerVentana.setAttribute("id", "headerVentana");
    cerrarVentana.setAttribute("href", "javascript: cerrar()");

    headerVentana.style.width="100%";
    headerVentana.style.display="flex";
    headerVentana.style.justifyContent="flex-end";
    headerVentana.style.alignItems="center";

    tituloPelicula.innerText= pelicula.Title;
    cerrar.src= "Imagenes/cerrar.png";
    cerrar.style.marginLeft="15px";
    cerrar.style.cursor="pointer";
    portadaPelicula.src=pelicula.Poster;
    bodyVentana.style.display="flex";
    datosPelicula.style.width= "auto";
    datosPelicula.style.marginLeft="15px";

    cerrarVentana.appendChild(cerrar);
    headerVentana.appendChild(tituloPelicula);
    headerVentana.appendChild(cerrarVentana);
    imagenPortada.appendChild(portadaPelicula);
    bodyVentana.appendChild(imagenPortada);
    bodyVentana.appendChild(datosPelicula);
    datosPelicula.appendChild(released);
    datosPelicula.appendChild(country);
    datosPelicula.appendChild(runtime);
    datosPelicula.appendChild(genre);
    datosPelicula.appendChild(director);
    datosPelicula.appendChild(language);
    datosPelicula.appendChild(production);
    datosPelicula.appendChild(imdbRating);
    datosPelicula.appendChild(separador);
    datosPelicula.appendChild(plot);
    document.getElementById("ventanaModal").append(headerVentana);
    document.getElementById("ventanaModal").append(bodyVentana);
}

function cerrar(){
    let div = document.getElementById("ventanaModal");
    div.style.display="none";
    headerVentana.remove();
    bodyVentana.remove();
    
}