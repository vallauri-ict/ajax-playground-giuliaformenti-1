<?php

header("Content-type:application/json;charset=utf-8");
require ("libreria.php");

if($_SERVER["REQUEST_METHOD"]=="POST"){
    // 1. Controllo parametri
    if(!isset($_POST["research"]))//inutile
    {
        http_response_code(400);
        die("Parametro mancante: categoria");
    }

    // 2. Connessione
    $con = connection("db_progetto");
    $research = $_POST["research"];
    
    // 3. Query
    $sql="SELECT * FROM modelli WHERE nomeModello LIKE '$research%'";
    $data = runQuery($con, $sql);
    if(count($data)==0)
    {
        //error(401, "Categoria non valida");
        $sql="SELECT * FROM brands WHERE marca LIKE '$research%'";
        $data = runQuery($con, $sql);
        if(count($data) == 0)
        {
            error(404, "DO L'ERRORE QUI");
        }
        else
        {
            session_start();
            $_SESSION["ricerca"]=$research;
            $_SESSION["tab"] = "brands";
            $_SESSION["cUtente"] = $_POST["cUtente"];
            $_SESSION["scadenza"]=time() + SCADENZA;
            setcookie(session_name(), session_id(), time()+SCADENZA, "/"); // / --> vale per tutte le risorse
            echo(json_encode(array("ris"=>"ok")));
        }
    }
    // 4. Creazione session e restituzione risultato
    else
    {
        session_start();
        $_SESSION["ricerca"]=$research;
        $_SESSION["tab"] = "modelli";
        $_SESSION["cUtente"] = $_POST["cUtente"];
        $_SESSION["scadenza"]=time() + SCADENZA;
        setcookie(session_name(), session_id(), time()+SCADENZA, "/"); // / --> vale per tutte le risorse
        echo(json_encode(array("ris"=>"ok")));
    }
    // 5. Close
    $con->close();
}
?>