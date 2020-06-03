<?php

    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("categoria");
    // connessione
    $con = connection("db_progetto");
    $cat = $_SESSION["categoria"];

    // query
    $sql="SELECT* FROM modelli WHERE genere='$cat'";
    /*$user=runQuery($con, $sql);
    $sql="SELECT f.cFiliale as codFiliale, nome FROM conti c, filiali f WHERE f.cFiliale=c.cFiliale AND c.cCorrentista=$id";*/
    $data=runQuery($con, $sql);

    //$nomeUtente=$user[0]["nome"];
    $data=array("data" => $data);

    echo(json_encode($data));

    $con->close();
?>