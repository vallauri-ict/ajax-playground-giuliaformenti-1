<?php

header("Content-type:application/json;charset=utf-8");
require ("libreria.php");

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    // 1. Controllo parametri
    if(!isset($_POST["username"]))
    {
        http_response_code(400);
        die("Parametro mancante: username");
    }
    if(!isset($_POST["password"]))
    {
        http_response_code(400);
        die("Parametro mancante: password");
    }

    // 2. Connessione
    $con = connection("db_progetto");
    $user = $con->real_escape_string($_POST["username"]);
    $pw = $con->real_escape_string($_POST["password"]);

    // 3. Query
    $sql="SELECT* FROM utenti WHERE nome='$user'";
    $data= runQuery($con, $sql);
    if(count($data)==0)
    {
        error(401, "Username non valido");
    }     
    else if($data[0]["password"] != $pw)
    {
        error(401, "Password non valida");
    }
    
    
    // 4. Creazione session e restituzione risultato
    else
    {
        session_start();
        $_SESSION["cUtente"]=$data[0]["cUtente"];
        $_SESSION["scadenza"]=time() + SCADENZA;
        setcookie(session_name(), session_id(), time()+SCADENZA, "/"); // / --> vale per tutte le risorse
        
        //$data=array($data);
        echo json_encode(array("ris"=>"ok", "cUtente"=>$data[0]["cUtente"], "nome"=>$data[0]["nome"]));
    }

    // 5. Close
    $con->close();

}

?>