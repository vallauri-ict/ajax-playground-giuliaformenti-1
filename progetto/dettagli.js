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
    let tagliaScelta = 0;
    let listCarello = [];
    let l = -1;
    //alert(userId);
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
    
    let marca = sessionStorage.getItem("marca");
    let modello = sessionStorage.getItem("modello");
    let genere = sessionStorage.getItem("genere");
    let prezzo = sessionStorage.getItem("prezzo");
    let sconto = sessionStorage.getItem("sconto");
    let id = sessionStorage.getItem("id");
    let path = "img/" + modello.charAt(0).toUpperCase() + modello.slice(1) + "grande.jpg";
    
    /*$("#imgg").prop("src", path);
    $("#divImg").css({"display": "inline-block", "width": "700px", "height": "700px", "align": "left", "margin-right": "100px"});
    $("#divDettagli").css({"display": "inline-block"});
    $("h2").text(marca + " " + modello + " - " + genere);
    let _p = $("#divDettagli p");
    if(id == userId)
    {
        _p.html("<del>" + prezzo + "€</del> <p id='sconto'>" + sconto + "€</p>");
    }
    else
    {
        _p.text(prezzo + "€").css("font-size", "18pt");
    }
    let list = $(".dropdown-item");
    let taglia;
    for(let i = 0; i < 2; i++)
    {
        list.eq(i).text(i);
    }*/
    let _corpo = $("<div>").appendTo(_main);
    let _divImg = $("<div>").appendTo(_corpo);
    //let _img = $("<img>").prop("src", path).css({"object-fit": "cover", "height": "-webkit-fill-available"}).appendTo(_divImg);
    let _img = $("<img>").prop("src", path).appendTo(_divImg);
    _divImg.css({"display": "inline-block", "width": "650px", "height": "650px", "margin-right": "150px"});
    
    let _div = $("<div>").appendTo(_corpo);
    //_div.css({"display": "inline-block", "width": "300px", "height": "300px"});
    _div.css({"display": "inline-block"});
    $("<h2>").text(marca.charAt(0).toUpperCase() + marca.slice(1) + " " + modello.charAt(0).toUpperCase() + modello.slice(1) + " - " + genere.charAt(0).toUpperCase() + genere.slice(1)).appendTo(_div);
    $("<br>").appendTo(_div);
    if(id == userId)
    {
        $("<p>").html("<del>" + prezzo + "€</del> <p id='sconto' style='\"color\": \"red\"'>" + sconto + "€</p>").css("font-size", "22pt").appendTo(_div);
    }
    else
    {
        $("<p>").text(prezzo + "€").css("font-size", "22pt").appendTo(_div);
    }
	$("<br>").appendTo(_div);    
    _div.css({"width": "300px"});
    
    /*let _divDropdown = $("<div>").prop("class", "dropdown").appendTo(_div);
    let _btn = $("<button>").prop({"type": "button", "class": "btn btn-secondary dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false", "value": "Seleziona la taglia"}).text("Seleziona la taglia").appendTo(_divDropdown);
    let _divDropMenu = $("<div>").prop({"class": "dropdown-menu", "aria-labelledby": "dropdownMenuButton"});
    let taglia;
    //let _a = $("<a>").prop({"class": "dropdown-item"}).text(taglia).appendTo(_divDropMenu);
    taglia = 39;
    let _a = $("<a>").prop({"class": "dropdown-item"}).html(39).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(40).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(41).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(42).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(43).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(44).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(45).appendTo(_divDropMenu);
    _a = $("<a>").prop({"class": "dropdown-item"}).text(46).appendTo(_divDropMenu);*/
    /*for(let i = 0; i < 17; i++)
    {
        let _options = $("<options>").text(taglia).appendTo(_divDropMenu);
        _a.on("click", function(){
            _btn.prop("value", taglia);
        });
        taglia += 0,5;
    }*/
    let taglia;
    if(genere == "uomo")
    {
        //alert("ok");
        /*_select.appendTo(_div);
        taglia = 39;
        for(let i = 0; i < 17; i++)
        {
            let _options = $("<option>", {
                "text": taglia
            }).appendTo(_select);
            taglia += 0.5;
        }*/
        taglia = 39;
        for(let i = 0; i < 17; i++)
        {
            let _btnTaglia = $("<button>").prop({"type": "button", "class": "btn btn-light"}).text(taglia).appendTo(_div);
            _btnTaglia.on("click", function(){
                tagliaScelta = $(this).text();
            });
            taglia += 0.5;
        }
    }
    else if(genere == "donna")
    {
        taglia = 35;
        for(let i = 0; i < 11; i++)
        {
            /*let _options = $("<options>").text(taglia++).appendTo(_divDropMenu);
            taglia += 0,5;*/
            /*let _taglie = $("<div>").css({"display": "inline-block", "width": "30px", "height": "30px", "border": "1px solid black", "margin-right": "15px"}).text(taglia).appendTo(_div);
            taglia += 0.5;*/
            /*let _divToolbar = $("<div>", {
                "class": "btn-toolbar",
                "role": "toolbar"
            });*/
            let _btnTaglia = $("<button>").prop({"type": "button", "class": "btn btn-light"}).text(taglia).appendTo(_div);
            _btnTaglia.on("click", function(){
                tagliaScelta = $(this).text();
            });
            taglia += 0.5;
        }
    }
    else
    {
        taglia = 27;
        for(let i = 0; i < 27; i++)
        {
            let _btnTaglia = $("<button>").prop({"type": "button", "class": "btn btn-light"}).text(taglia).appendTo(_div);
            _btnTaglia.on("click", function(){
                tagliaScelta = $(this).text();
            });
            taglia += 0.5;
        }
    }
    $("<br>").appendTo(_div);
    $("<br>").appendTo(_div);
    let _btnAggiungi = $("<button>").prop({"type": "button", "class": "btn btn-info"}).text("Aggiungi al carrello").appendTo(_div);
    /*_btnAggiungi.on("click", function(){
        if(tagliaScelta != 0)
        {
            l++;
            $("#carrello").css({"border-color": "red", "color": "red"});
            //let item = marca + " " + modello + " " + prezzo + " - Taglia: " + tagliaScelta;
            //if(listCarello.includes(item))
            //{
            /*listCarello[l]["marca"] = marca;
            listCarello[l]["modello"] = modello;
            listCarello[l]["prezzo"] = prezzo;
            listCarello[l]["taglia"] = tagliaScelta;*/
            //alert(listCarello[0]);
            //}
            
            sessionStorage.setItem("listCarello", listCarello);
            //l++;
        }
        else
        {
            alert("Devi scegliere la taglia");
        }
    });*/
    
    /***************CLICK***************/
    /*$("#carrello").on("click", function(){
        window.location.href = "carrello.html";
    });*/
    
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