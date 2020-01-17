<!DOCTYPE html>
<html>
  <head>
    <!-- PHP CONEX -->
    <?php
    $link= mysqli_connect("localhost", "root", "", "sprint5");
    mysqli_set_charset($link, 'utf8');
    ?>
    
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="css/style.css" rel="stylesheet" type="text/css">

    <title>El Tiempo</title>

  </head>
  <body>
    <section class="container-fluid">
    <!--CIUDAD, DIA Y TIEMPO ACTUAL-->

      <div class="row tal">
        <div class="col-xs-5 col-md-5 col-lg-5 cprincipal">
          <div class="infoprin">    
            <img src="" class="imgprin" alt="tiempo" id="imgCurrent"> 
            <h4 id="name"></h4>
            <h6 id="day"></h6>
            <h6 id="date"></h6>
          </div>     
          <div class="tempactual">
            <h2 id="mainTemp"></h2> 
            <h4 id="maxMin"></h4>
          </div> 
          <button id="refresh" class="btn btn-success refrescar">Refresh</button>  
        </div>
        <div class="col-xs-2 col-md-2 col-lg-2 detallesActual">
          <table width="200" border="1">
            <tbody>
              <tr>
                <td>Velocidad Viento<br>
                  <h6 id="wind"></h6>
                </td>
              </tr>
              <tr>
                <td>Nubes<br>
                  <h6 id="cloud"></h6>
                </td>
              </tr>
              <tr>
                <td>Volumen lluvia<br>
                  <h6 id="rain"></h6>
                </td>
              </tr>
              <tr>
                <td>Volumen nieve<br>
                  <h6 id="snow"></h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-5 col-md-5 col-lg-5 cprincipal">
          <table border="1">
            <tbody>
              <tr>
                <th id="day1" scope="col"></th>
                <th id="day2" scope="col"></th>
                <th id="day3" scope="col"></th>
                <th id="day4" scope="col"></th>
                <th id="day5" scope="col"></th>
              </tr>
              <tr>
                <td>
                  <img src="" class="imgdias" alt="tiempo" id="imgDay1"> 
                  <h4 id="tempDay1"></h4> 
                  <h6 id="maxMinDay1"></h6>
                </td>
                <td>
                  <img src="" class="imgdias" alt="tiempo" id="imgDay2"> 
                  <h4 id="tempDay2"></h4> 
                  <h6 id="maxMinDay2"></h6>
                </td>
                <td>
                  <img src="" class="imgdias" alt="tiempo" id="imgDay3"> 
                  <h4 id="tempDay3"></h4> 
                  <h6 id="maxMinDay3"></h6>
                </td>
                <td>
                  <img src="" class="imgdias" alt="tiempo" id="imgDay4"> 
                  <h4 id="tempDay4"></h4> 
                  <h6 id="maxMinDay4"></h6>
                </td>
                <td>
                  <img src="" class="imgdias" alt="tiempo" id="imgDay5"> 
                  <h4 id="tempDay5"></h4> 
                  <h6 id="maxMinDay5"></h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6 col-md-6 col-lg-6">
          <div class="input-group mb-3">
            <select id="citySelected" class="custom-select" name="city">
                <?php
                    $con = "SELECT id_city, name FROM city";
                    $r = mysqli_query($link, $con);
                    while ($arr = mysqli_fetch_array($r)) { ?>
                    <option value="<?php echo $arr[0]; ?>" <?php if($arr[1] === "Madrid" or $arr[0] === "6359304"){echo "selected";}?>>
                    <?php echo $arr[1]; ?>
                    </option>
                <?php      }  ?>
            </select>
          </div>
        </div>
      </div>
      <br>
    </section>

    <!-- Jquery -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.js"
      integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
      crossorigin="anonymous">
    </script>

    <!-- Hoja de JS -->
    <script src="js/sprint5.js"></script>

  </body>
</html>