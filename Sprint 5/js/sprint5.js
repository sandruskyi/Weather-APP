var o;
o = $(document);
o.ready(controlador);

//Realiza la siguiente función al cargar la página
function controlador(){
    
    //Llamo a la función más abajo definida para que me actualice los datos según el ID definido en el SELECT
    change();
    
    //Creo un evento que llama a la función más abajo definida para que se ejecute cada vez que se cambie el SELECT
    $("#citySelected").change(change);

    //Función que modifica la url de la API en función de la ciudad que se quiera consultar a través de la elección del SELECT
    function change(){
        
    city = $("#citySelected").val();

    var urlgetCurrent = "http://api.openweathermap.org/data/2.5/weather?id="+city+"&units=metric&APPID=72b335f0f538911bb5af1277cf36cb19";
    var urlgetForecast = "http://api.openweathermap.org/data/2.5/forecast?id="+city+"&units=metric&APPID=72b335f0f538911bb5af1277cf36cb19";
       
    //Solicitud de conexión con el servidor(API) a través de AJAX, la url de la API dependerá de la información que queramos recibir
    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlgetCurrent,
        //Si el enlace es exitoso-> La API nos devuelve un JSON
        success: function(currentData){
            console.log(currentData);

            //Consulta el icon metereológico recibido del request y lo pasamos como parámetro del src de la imagen de HTML
            var img = currentData.weather[0].icon;
            $("#imgCurrent").attr("src", "img/"+img+"@2x.png");

            //Consulta el nombre recibido del request
            $("#name").html(currentData.name);

            //Consulta la temperatura actual recibida del request
            $("#mainTemp").html(Math.round(currentData.main.temp) + "ºC");

            //Consulta las temperaturas máximas y mínimas recibidas del request
            $("#maxMin").html("Máx. " + Math.round(currentData.main.temp_max) + "ºC / Min. " + Math.round(currentData.main.temp_min) + "ºC");

            //Función para extraer la fecha del dispositivo en el momento del request
            var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
            var d = new Date(currentData.dt*1000);
            var output = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();  
            var dia = d.getDay();

            //Consulta el día del request(Devuelto por la API en UNIX(no se transformarlo), así que he usado el propia del dispositivo)
            $("#day").html(dias[dia]);

            //Consulta la fecha del request dd/mm/aaaa(Devuelta por la API en UNIX(no se transformarlo), así que he usado la propia del dispositivo)
            
            $("#date").html(output);

            //Consulta la velocidad del viento recibida del request
            $("#wind").html(currentData.wind.speed + " m/s");

            //Consulta el porcentaje de nubosidad recibido del request
            $("#cloud").html(currentData.clouds.all + " %");
            
            //El request nos retorna lluvia y nieve solo si hay datos, así que hacemos una función para que si no nos devuelve datos
            //nos comunique un mensaje, y si recibe datos, los muestre.
            //Lo de las 3h es porque solo queremos que nos de datos de la hora anterior.

            if(currentData.rain === undefined || currentData.rain["3h"] != null){
                $("#rain").html("0 mm³ en la última hora");
            }
            else{
                $("#rain").html(currentData.rain["1h"] + " mm³ en la última hora");
            };
            if(currentData.snow === undefined || currentData.snow["3h"] != null){
                $("#snow").html("0 mm³ en la última hora");
            }
            else{
                $("#snow").html(currentData.snow["1h"] + " mm³ en la última hora");
            };
        },

        //Si el enlace no es exitoso-> Nos muestra el siguiente mensaje
        error: function(){
            console.log("No se recibió respuesta");
        }
    });

    //Solicitud de conexión con el servidor(API) a través de AJAX
    $.ajax({

        type: "GET",
        dataType: "json",
        url: urlgetForecast,
        //Si el enlace es exitoso-> La API nos devuelve un JSON
        success: function(forecastData){
            console.log(forecastData);

            var imgDay1 = forecastData.list[7].weather[0].icon;
            var imgDay2 = forecastData.list[15].weather[0].icon;
            var imgDay3 = forecastData.list[23].weather[0].icon;
            var imgDay4 = forecastData.list[31].weather[0].icon;
            var imgDay5 = forecastData.list[39].weather[0].icon;
            
            $("#imgDay1").attr("src", "img/"+imgDay1+"@2x.png");
            $("#imgDay2").attr("src", "img/"+imgDay2+"@2x.png");
            $("#imgDay3").attr("src", "img/"+imgDay3+"@2x.png");
            $("#imgDay4").attr("src", "img/"+imgDay4+"@2x.png");
            $("#imgDay5").attr("src", "img/"+imgDay5+"@2x.png");

            //Función para extraer la fecha del dispositivo en el momento del request
            var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
            function dia(){
                var dia = new Date(forecastData.list[0].dt*1000);
                var f = (dia.getDay());
                return f;
            }

            //Para mostrar los 5 días siguientes al actual, realizamos la siguiente operación:
            //Módulo de ((la posición del array "días" en el día actual(x), más 1 si es al siguiente día, más dos si es dentro de dos días, etc...) dividido entre 7)->
            // (x+1,2,3,4 ó 5)%7
            //El resultado será la posición en el array del día que queramos mostrar 
            $("#day1").html(dias[(dia()+1)%7]);
            $("#day2").html(dias[(dia()+2)%7]);
            $("#day3").html(dias[(dia()+3)%7]);
            $("#day4").html(dias[(dia()+4)%7]);
            $("#day5").html(dias[(dia()+5)%7]);
            
            //Mostramos la temperatura media de las siguientes 24, 48, 72... horas desde la consulta(sumando los 8 datos y dividiéndolos entre 8),
            //asumiendo así que esa será la temperatura media de ese día, 
            //ya que la API solo nos devuelve 40 datos, separados en intervalos de 3 horas
            //Las almaceno en variables por si quisiera mostrarlas en el html (he decidido que no quiero por ahora)
            var tempDay1 = (Math.round((forecastData.list[0].main.temp + forecastData.list[1].main.temp + 
                forecastData.list[2].main.temp + forecastData.list[3].main.temp + forecastData.list[4].main.temp +
                forecastData.list[5].main.temp + forecastData.list[6].main.temp + forecastData.list[7].main.temp)/8) + " ºC");
            var tempDay2 = (Math.round((forecastData.list[8].main.temp + forecastData.list[9].main.temp + 
                forecastData.list[10].main.temp + forecastData.list[11].main.temp + forecastData.list[12].main.temp +
                forecastData.list[13].main.temp + forecastData.list[14].main.temp + forecastData.list[15].main.temp)/8) + " ºC");
            var tempDay3 = (Math.round((forecastData.list[16].main.temp + forecastData.list[17].main.temp + 
                forecastData.list[18].main.temp + forecastData.list[19].main.temp + forecastData.list[20].main.temp +
                forecastData.list[21].main.temp + forecastData.list[22].main.temp + forecastData.list[23].main.temp)/8) + " ºC");
            var tempDay4 = (Math.round((forecastData.list[24].main.temp + forecastData.list[25].main.temp + 
                forecastData.list[26].main.temp + forecastData.list[27].main.temp + forecastData.list[28].main.temp +
                forecastData.list[29].main.temp + forecastData.list[30].main.temp + forecastData.list[31].main.temp)/8) + " ºC");
            var tempDay5 = (Math.round((forecastData.list[32].main.temp + forecastData.list[33].main.temp + 
                forecastData.list[34].main.temp + forecastData.list[35].main.temp + forecastData.list[36].main.temp +
                forecastData.list[37].main.temp + forecastData.list[38].main.temp + forecastData.list[39].main.temp)/8) + " ºC");

            //Mostramos la temperatura máxima y mínima de las siguientes 24, 48, 72... horas desde la consulta(consultando los 8 datos
            //y quedándonos con el máximo y mínimo valor, según corresponda),
            //asumiendo así que esas serán las temperaturas máx. y min. de ese día, 
            //ya que la API solo nos devuelve 40 datos, separados en intervalos de 3 horas
            $("#maxMinDay1").html("Máx. " + Math.round(Math.max(forecastData.list[0].main.temp_max, forecastData.list[1].main.temp_max, 
                forecastData.list[2].main.temp_max, forecastData.list[3].main.temp_max, forecastData.list[4].main.temp_max,
                forecastData.list[5].main.temp_max, forecastData.list[6].main.temp_max, forecastData.list[7].main.temp_max)) + "ºC / Min. " +
                Math.round(Math.min(forecastData.list[0].main.temp_min, forecastData.list[1].main.temp_min, 
                forecastData.list[2].main.temp_min, forecastData.list[3].main.temp_min, forecastData.list[4].main.temp_min,
                forecastData.list[5].main.temp_min, forecastData.list[6].main.temp_min, forecastData.list[7].main.temp_min)) + "ºC");
            $("#maxMinDay2").html("Máx. " + Math.round(Math.max(forecastData.list[8].main.temp_max, forecastData.list[9].main.temp_max, 
                forecastData.list[10].main.temp_max, forecastData.list[11].main.temp_max, forecastData.list[12].main.temp_max,
                forecastData.list[13].main.temp_max, forecastData.list[14].main.temp_max, forecastData.list[15].main.temp_max)) + "ºC / Min. " +
                Math.round(Math.min(forecastData.list[8].main.temp_min, forecastData.list[9].main.temp_min, 
                forecastData.list[10].main.temp_min, forecastData.list[11].main.temp_min, forecastData.list[12].main.temp_min,
                forecastData.list[13].main.temp_min, forecastData.list[14].main.temp_min, forecastData.list[15].main.temp_min)) + "ºC");
            $("#maxMinDay3").html("Máx. " + Math.round(Math.max(forecastData.list[16].main.temp_max, forecastData.list[17].main.temp_max, 
                forecastData.list[18].main.temp_max, forecastData.list[19].main.temp_max, forecastData.list[20].main.temp_max,
                forecastData.list[21].main.temp_max, forecastData.list[22].main.temp_max, forecastData.list[23].main.temp_max)) + "ºC / Min. " +
                Math.round(Math.min(forecastData.list[16].main.temp_min, forecastData.list[17].main.temp_min, 
                forecastData.list[18].main.temp_min, forecastData.list[19].main.temp_min, forecastData.list[20].main.temp_min,
                forecastData.list[21].main.temp_min, forecastData.list[22].main.temp_min, forecastData.list[23].main.temp_min)) + "ºC");
            $("#maxMinDay4").html("Máx. " + Math.round(Math.max(forecastData.list[24].main.temp_max, forecastData.list[25].main.temp_max, 
                forecastData.list[26].main.temp_max, forecastData.list[27].main.temp_max, forecastData.list[28].main.temp_max,
                forecastData.list[29].main.temp_max, forecastData.list[30].main.temp_max, forecastData.list[31].main.temp_max)) + "ºC / Min. " +
                Math.round(Math.min(forecastData.list[24].main.temp_min, forecastData.list[25].main.temp_min, 
                forecastData.list[26].main.temp_min, forecastData.list[27].main.temp_min, forecastData.list[28].main.temp_min,
                forecastData.list[29].main.temp_min, forecastData.list[30].main.temp_min, forecastData.list[31].main.temp_min)) + "ºC");
            $("#maxMinDay5").html("Máx. " + Math.round(Math.max(forecastData.list[32].main.temp_max, forecastData.list[33].main.temp_max, 
                forecastData.list[34].main.temp_max, forecastData.list[35].main.temp_max, forecastData.list[36].main.temp_max,
                forecastData.list[37].main.temp_max, forecastData.list[38].main.temp_max, forecastData.list[39].main.temp_max)) + "ºC / Min. " +
                Math.round(Math.min(forecastData.list[32].main.temp_min, forecastData.list[33].main.temp_min, 
                forecastData.list[34].main.temp_min, forecastData.list[35].main.temp_min, forecastData.list[36].main.temp_min,
                forecastData.list[37].main.temp_min, forecastData.list[38].main.temp_min, forecastData.list[39].main.temp_min)) + "ºC");

        },
        //Si el enlace no es exitoso-> Nos muestra el siguiente mensaje
        error: function(){
            console.log("No se recibió respuesta");
        }
    });
    };
    //Actualiza la búsqueda sin refrescar la página
    $("#refresh").click(function(){
        controlador();
    });
};
$("#logIn").click(function(){
    $("#user button").hide();
    $("#user").prepend("<tr><td><input type='text' name='email' class='form-control' id='email' placeholder='Email' required></td></tr>");
    $("#user").append("<td><input type='password' name='pass' class='form-control' id='pass' placeholder='Password' required></td>");
    $("#user").append("<td><button class='btn btn-primary' type='button' name='submit' class='form-control' id='submit'>Entra</button></td>");

});
$("#register").click(function(){

});