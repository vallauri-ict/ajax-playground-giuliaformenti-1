"use strict";

$(document).ready(function (){
    $("#btnModal").hide();
    $("#mod").css("background-image", "img/adidas.png");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
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
    
    
    setTimeout(function(){
        $("#btnModal").click();
    }, 500);
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    });
    //$("#myModal").show();
    /*$('#myModal').reveal({
        animation: 'fadeAndPop', // Animazioni disponibili: fade, fadeAndPop, none
        animationspeed: 2000, // Velocità animazione
        closeonbackgroundclick: true, // Attivazione della chiusura sul click del background
        dismissmodalclass: 'close-reveal-modal' // La classe del pulsante di chiusura
     });*/
    
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
    /*let _elements = $("#categorie li");
    _elements.mouseover(function(){
        $(this).css( 'cursor', 'pointer' );
    });*/
    /*_elements.on("click", function(){
        let _text = $(this).text().toLowerCase().toString();
        alert(_text);
        if(_text == "uomo")
        {
            alert("sono uomo");
        }
        else
        {
            alert("no");
        }
    });*/
    /*$("#uomo").on("click", function(){
        console.log("uomo");
        $(this).prop({"method": "POST", "action": "pagina2.php?testo=" + "uomo"}).submit();
    });
    $("#donna").on("click", function(){
        console.log("donna");
    });
    $("#bambino").on("click", function(){
        console.log("bambino");
    });
    $("#brands").on("click", function(){
        console.log("brands");
    });*/
});

function random(min, max){
    let rnd = Math.floor((max - min + 1) * Math.random()) + min;
    return rnd;
    //return let rnd = Math.floor((max - min + 1) * Math.random()) + min;
}