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
    if(!isset($_POST["mail"]))
    {
        http_response_code(400);
        die("Parametro mancante: username");
    }
    if(!isset($_POST["telefono"]))
    {
        http_response_code(400);
        die("Parametro mancante: password");
    }

    // 2. Connessione
    $con = connection("db_progetto");
    $user = $con->real_escape_string($_POST["username"]);
    $pw = $con->real_escape_string($_POST["password"]);
    $mail = $con->real_escape_string($_POST["mail"]);
    $telefono = $_POST["telefono"];

    // 3. Query
    $sql="SELECT* FROM utenti WHERE nome='$user'";
    $data= runQuery($con, $sql);
    if(count($data) != 0)
    {
        error(401, "Username già esistente");
    }     
    else
    {
        $sql="SELECT* FROM utenti WHERE mail='$mail'";
        $data= runQuery($con, $sql);
        if(count($data) != 0)
        {
            error(401, "Mail già esistente");
        }
        else
        {
            $sql="SELECT* FROM utenti WHERE telefono='$telefono'";
            $data= runQuery($con, $sql);
            if(count($data) != 0)
            {
                error(401, "Telefono già esistente");
            }
            else
            {
                $sql = "INSERT INTO utenti (nome, mail, telefono, password) VALUES ('$user', '$mail', '$telefono', '$pw')";
                $data = runQuery($con, $sql);
                $sql = "SELECT* FROM utenti WHERE telefono='$telefono'";
                $data = runQuery($con, $sql);
                if(count($data) == 0)
                {
                    error(401, "ERRORE");
                }
                else
                {
                    echo json_encode(array("ris"=>"ok"));
                }
            }
        }
    }
    $con->close();
}
?>