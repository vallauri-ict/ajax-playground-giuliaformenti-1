<?php

    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    /*if(!isset($_SESSION["cBrand"]))
    {*/
    checkSession("categoria");
    //}
    /*else
    {
        checkSession("cBrand");
    }*/
    // connessione
    $con = connection("db_progetto");
    /*if(!isset($_SESSION["cBrand"]))
    {*/
        $cat = $_SESSION["categoria"];
        $tab = $_SESSION["tabella"];

        // query
        if($tab == "modelli")
        {
            $sql="SELECT * FROM modelli, brands WHERE genere='$cat' AND modelli.cMarca=brands.cBrands";
        }
        else
        {
            $sql="SELECT* FROM brands";
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
    $data=array("tabella" => $tab, "data" => $data);

    echo(json_encode($data));

    $con->close();
?>