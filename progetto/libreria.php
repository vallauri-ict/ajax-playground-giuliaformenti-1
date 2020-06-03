<?php
    
define ("SCADENZA", 30);

function connection($dbName){
	define('DBHOST', 'localhost');
	define('DBUSER', 'root');
	define('DBPASS', '');
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	try
	{
		$con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
		$con->set_charset("utf8");
		return $con;
	}
	catch (mysqli_sql_exception $ex)
	{
	    error(503, "Errore connessione db: " . $ex->getMessage());
	}
}


function runQuery($con, $sql){
    try{
        $rs=$con->query($sql);
    }
    catch (mysqli_sql_exception $ex)
    {
        $con->close();
        error(500, "Errore esecuzione query. " . $ex->getMessage());
    }

    if(!is_bool($rs))
        $data=$rs->fetch_all(MYSQLI_ASSOC);
    else
        $data=$rs;
    return $data;
}


function checkSession($key){
	session_start();
    // Il server NON può spedire una pagina HTML !!
	if (!isset($_SESSION[$key]))
        error(403, "Sessione scaduta");
	else if (!isset($_SESSION["scadenza"]) || time() > $_SESSION["scadenza"] )
	{
		destroySession();
        error(403, "Sessione scaduta");
	}
	else{
		$_SESSION["scadenza"] = time() + SCADENZA;
		// Aggiorno la scadenza dei cookie
		setcookie(session_name(), session_id(), $_SESSION["scadenza"], "/");
	}		
}
	
function parameterControl($parameter, $responseCode, $secondaryCondition=true)
{
    if(!isset($_REQUEST["$parameter"]) && $secondaryCondition)
        error($responseCode, "Parametro mancante ($parameter)");
    else
        return $_REQUEST["$parameter"];
}

function isNumericControl($parameterName, $con)
{
    $parameter = $con->real_escape_string($_REQUEST["$parameterName"]);
    if (!is_numeric($parameter))
    {
        $con->close();
        error(400, "Il parametro $parameterName deve essere numerico.");
    }
    return $parameter;
}

function error($responseCode, $message){
    http_response_code($responseCode);
    die($message);
}

function destroySession(){
    session_unset();
    session_destroy();
}
?>