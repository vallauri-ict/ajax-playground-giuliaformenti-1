<?php

    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("cBrand");
    // connessione
    $con = connection("db_progetto");
    $cBrand = $_SESSION["cBrand"];

    /*$sql = "SELECT modelli.cModello, modelli.nomeModello, modelli.cMarca, modelli.genere, modelli.prezzo, brands.marca FROM modelli, brands WHERE modelli.cMarca='$cBrand' AND modelli.cMarca=brands.cBrands";*/
    $sql = "SELECT* FROM modelli, brands WHERE modelli.cMarca='$cBrand' AND modelli.cMarca=brands.cBrands";
    $data=runQuery($con, $sql);

    //$nomeUtente=$user[0]["nome"];
    $data=array("data" => $data, "cUtente"=>$_SESSION["cUtente"]);

    echo(json_encode($data));

    $con->close();
?>