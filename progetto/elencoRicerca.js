"use strict"
$(document).ready(function(){
    let _main = $("#main");
    let _uomo = $("#uomo");
    let _donna = $("#donna");
    let _bambino = $("#bambino");
    let _brands = $("#brands");  
    let _btnUtente = $("#utente");   
    let userId = sessionStorage.getItem("userId");
    let userName = sessionStorage.getItem("userName");
    //Salert(userId);
    if(userId != null)
    {
        //alert(userName);
        $("#utente a").text(userName + "/Logout");
    }
    
    _btnUtente.on("click", function(){
        if(userId == null)
        {
            window.location.href = "login.html";
        }
        else
        {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userName");
            $("#utente a").text("Registrati/Login");
            window.location.href = "index.html";
        }
    });
    
    if(sessionStorage.getItem("nessunRisultato") != "true")
    {
        let _richiesta = inviaRichiesta("GET", "elencoModelliBySearch.php");
        //let _richiesta=inviaRichiesta("POST", "elencoModelli.php", {"categoria": "uomo"});
        _richiesta.fail(function (jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                //window.location="login.html";
                //alert("403")
                alert("elenco");
            }
            else
            {
                error(jqXHR, test_status, str_error);
                //alert("general");
            }
        });
        _richiesta.done(function (data) {
            //alert("ok");
            //alert(data.data[0]["nomeModello"]);
            console.log(data);
            //_wrapper.show();
            //_divMovimenti.hide();

            // nome correntista
            /*let _p=$("<p>", {
                "css":{"text-align":"right"},
                "html":"Benvenuto <b>" + data.name +" </b>"
            }).appendTo(_divTitolo);*/
            /*if(data.tabella == "modelli")
            {*/
                for(let record of data.data)
                {
                    /*let modello = record.nomeModello;
                    let path = "img/" + modello + ".jpg";
                    let _card = $("<div>").css({"display": "inline-block", "margin-left": "40px", "margin-right": "40px", "border-color": "light-gray", "border": "2px solid light-gray", "width": "320px", "height": "320px", "text-align":"center", "position": "relative"}).appendTo(_main);
                    let _img = $("<img>").css({"align": "center"}).prop("src", path).appendTo(_card);
                    let _p = $("<p>", {
                        "html": record.marca + " " + modello + " - " + record.genere
                    }).css({"font-weight": "bold", "text-align": "center"}).appendTo(_card);
                    $("<br>").appendTo(_p);
                    $("<p>", {
                        "html": record.prezzo
                    }).appendTo(_p);*/
                    let modello = record.nomeModello.charAt(0).toUpperCase() + record.nomeModello.slice(1);
                    let path = "img/" + modello + ".jpg";
                    let _card = $("<div>").css({"display": "inline-block", "margin-left": "40px", "margin-right": "40px", "border-color": "light-gray", "border": "2px solid light-gray", "width": "320px", "height": "320px", "text-align":"center"/*, "position": "relative"*/}).appendTo(_main);
                    let _img = $("<img>").css({"align": "center"}).prop("src", path).appendTo(_card);
                    let _p = $("<p>", {
                        "html": record.marca.charAt(0).toUpperCase() + record.marca.slice(1) + " " + modello + " - " + record.genere.charAt(0).toUpperCase() + record.genere.slice(1)
                    }).css({"font-weight": "bold", "text-align": "center"}).appendTo(_card);
                    $("<br>").appendTo(_p);
                    if(data.cUtente == record.cUtente)
                    {
                        $("<p>", {
                            "html": "<del>" + record.prezzo + "€</del><br><p id='sconto'>" + record.sconto + "€</p>"
                        }).appendTo(_p);
                        $("#sconto").css("color", "red");
                    }
                    else
                    {
                        $("<p>", {
                            "html": record.prezzo + "€"
                        }).appendTo(_p);
                    }


                    /***************MOUSEOVER E CLICK***************/
                    _card.mouseover(function(){
                        _card.css("cursor", "pointer");
                    });
                    _card.on("click", function(){
                        sessionStorage.setItem("marca", record.marca);
                        sessionStorage.setItem("modello", record.nomeModello);
                        sessionStorage.setItem("genere", record.genere);
                        sessionStorage.setItem("prezzo", record.prezzo);
                        sessionStorage.setItem("sconto", record.sconto);
                        sessionStorage.setItem("id", record.cUtente);
                        window.location.href = "dettagli.html";
                    });
                    /*let _tr = $("<tr>").appendTo(_tbody);
                    let _td = $("<td>", {
                        "html": record.cBrands
                    }).appendTo(_tr);
                    _td = $("<td>", {
                        "html": record.nomeModello
                    }).appendTo(_tr);
                    _td = $("<td>", {
                        "html": record.cMarca
                    }).appendTo(_tr);
                    _td = $("<td>", {
                        "html": record.genere
                    }).appendTo(_tr);
                    _td = $("<td>", {
                        "html": record.prezzo
                    }).appendTo(_tr);*/
                }
        });
    }
    else
    {
        let _h1 = $("<h1>", {
            "text": "Nessun risultato trovato",
            "css": {"margin-top": "20px"}
        }).appendTo(_main);
    }
       
    
    /***************CLICK***************/
    $("#titolo").on("click", function(){
        window.location.href = "index.html";
    });
    
    _uomo.on("click", function(){
        let _richiestaLogin= inviaRichiesta("POST", "esegui.php", { "categoria":"uomo", "tabella": "modelli", "cUtente": userId} );
        _richiestaLogin.fail(function(jqXHR, test_status, str_error) {
				alert("nok");
			});
        _richiestaLogin.done(function(data) {
            if(data.ris=="ok") // test inutile
            {
                window.location.href = "pagina2.html";
            }
        });
    });
    _donna.on("click", function(){
        let _richiestaLogin= inviaRichiesta("POST", "esegui.php", { "categoria":"donna", "tabella": "modelli", "cUtente": userId} );
        _richiestaLogin.fail(function(jqXHR, test_status, str_error) {
				alert(test_status);
			});
        _richiestaLogin.done(function(data) {
            if(data.ris=="ok") // test inutile
            {
                window.location.href = "pagina2.html";
            }
        });
    });
    _bambino.on("click", function(){
        let _richiestaLogin= inviaRichiesta("POST", "esegui.php", { "categoria":"bambino", "tabella": "modelli", "cUtente": userId} );
        _richiestaLogin.fail(function(jqXHR, test_status, str_error) {
				alert("nok");
			});
        _richiestaLogin.done(function(data) {
            if(data.ris=="ok") // test inutile
            {
                window.location.href = "pagina2.html";
            }
        });
    });
    _brands.on("click", function(){
        let _richiestaLogin= inviaRichiesta("POST", "esegui.php", { "categoria":"all", "tabella": "brands", "cUtente": userId} );
        _richiestaLogin.fail(function(jqXHR, test_status, str_error){
            alert("qui");
            alert(test_status);
        });
        _richiestaLogin.done(function(data) {
            if(data.ris=="ok") // test inutile
            {
                window.location.href = "pagina2.html";
            }
        });
    });
    
    $("#search").on("click", cerca);
    /*$("#search").on("click", function(){
        let _text = $("#txtSearch").val().toLocaleLowerCase();
        //alert(_text);
        if(_text != "")
        {
            let _richiestaRichiesta = inviaRichiesta("POST", "eseguiBySearch.php", { "research": _text, "cUtente": userId} );
            _richiestaRichiesta.fail(function(jqXHR, test_status, str_error) {
                //alert("inviaRichiesta");
                console.log(jqXHR);
                //alert(test_status + " " + jqXHR + " " + str_error);
                sessionStorage.setItem("nessunRisultato", "true");
                window.location.href = "elencoRicerca.html";
            });
            _richiestaRichiesta.done(function(data) {
                if(data.ris=="ok") // test inutile
                {
                    window.location.href = "elencoRicerca.html";
                }
            });
        }
        else
        {
            window.location.href = "index.html";
        }
    });*/
    $(document).on('keydown', function(event) {	
	   if(event.keyCode == 13)
        {
            cerca();
        }
	});
    
    function cerca(){
        let _text = $("#txtSearch").val().toLocaleLowerCase();
        //alert(_text);
        if(_text != "")
        {
            let _richiestaRichiesta = inviaRichiesta("POST", "eseguiBySearch.php", { "research": _text, "cUtente": userId} );
            _richiestaRichiesta.fail(function(jqXHR, test_status, str_error) {
                //alert("inviaRichiesta");
                console.log(jqXHR);
                //alert(test_status + " " + jqXHR + " " + str_error);
                sessionStorage.setItem("nessunRisultato", "true");
                window.location.href = "elencoRicerca.html";
            });
            _richiestaRichiesta.done(function(data) {
                if(data.ris=="ok") // test inutile
                {
                    window.location.href = "elencoRicerca.html";
                }
            });
        }
        else
        {
            window.location.href = "index.html";
        }
    }
    
    /***************MOUSEOVER***************/
    _uomo.mouseover(function(){
        _uomo.css("cursor", "pointer");
    });
    _donna.mouseover(function(){
        _donna.css("cursor", "pointer");
    });
    _bambino.mouseover(function(){
        _bambino.css("cursor", "pointer");
    });
    _brands.mouseover(function(){
        _brands.css("cursor", "pointer");
    });
});