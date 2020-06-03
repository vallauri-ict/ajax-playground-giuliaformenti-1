<?php

    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    /*if(!isset($_SESSION["cBrand"]))
    {*/
    checkSession("ricerca");
    //}
    /*else
    {
        checkSession("cBrand");
    }*/
    // connessione
    $con = connection("db_progetto");
    /*if(!isset($_SESSION["cBrand"]))
    {*/
    $ricerca = $_SESSION["ricerca"];
    $tab = $_SESSION["tab"];

    // query
    if($tab == "modelli")
    {
        /*$sql="SELECT modelli.cModello, modelli.nomeModello, modelli.cMarca, modelli.genere, modelli.prezzo, brands.marca FROM modelli WHERE nomeModello LIKE '$ricerca%'";*/
        $sql="SELECT* FROM modelli, brands WHERE nomeModello LIKE '$ricerca%' AND modelli.cMarca=brands.cBrands";
    }
    else
    {
        /*$sql = "SELECT modelli.cModello, modelli.nomeModello, modelli.cMarca, modelli.genere, modelli.prezzo, brands.marca FROM modelli, brands WHERE brands.marca LIKE '$ricerca%' AND modelli.cMarca=brands.cBrands";*/
        $sql = "SELECT* FROM modelli, brands WHERE brands.marca LIKE '$ricerca%' AND modelli.cMarca=brands.cBrands";
    }
    /*}
    else
    {
        $cBrand = $_SESSION["cBrand"];
        $sql="SELECT* FROM modelli WHERE cMarca='$cBrand'";
    }*/
    /*$user=runQuery($con, $sql);
    $sql="SELECT f.cFiliale as codFiliale, nome FROM conti c, filiali f WHERE f.cFiliale=c.cFiliale AND c.cCorrentista=$id";*/
    $data=runQuery($con, $sql);

    //$nomeUtente=$user[0]["nome"];
    $data=array("tabella" => $tab, "data" => $data, "cUtente"=>$_SESSION["cUtente"]);

    echo(json_encode($data));

    $con->close();
?>