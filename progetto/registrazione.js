"use strict"

$(document).ready(function() {	
	let _username = $("#usr");
	let _password = $("#pwd");
    let _mail = $("#mail");
	let _telefono = $("#phone");
	let _lblErrore = $("#lblError");
    let _lblSuccesso = $("#lblSuccess");
	
	//all'avvio apriamo subito il jumbotron
	$(".jumbotron").trigger("click");
    _lblErrore.hide();
    _lblSuccesso.hide();

	//$("#btnRegistrazione").on("click", controllaLogin);
	
	//il submit deve partire anche senza click 
	//ma con il solo tasto INVIO
	$(document).on('keydown', function(event) {	
	   if(event.keyCode == 13)
        {
            controllaLogin();
        }
	});
	
	
	function controllaLogin(){
        _username.removeClass("is-invalid");  //bordo rosso textbox
		_username.prev().removeClass("icona-rossa");  //colore icona			
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa");
        _mail.removeClass("is-invalid");  //bordo rosso textbox
		_mail.prev().removeClass("icona-rossa");  //colore icona			
        _telefono.removeClass("is-invalid");
		_telefono.prev().removeClass("icona-rossa"); 

		_lblErrore.hide();
        _lblSuccesso.hide();
		
        if (_username.val() == "")
        {
            _username.addClass("is-invalid"); //bordo rosso textbox
			_username.prev().addClass("icona-rossa"); //colore icona
        }
		else if (_password.val() == "")
        {
            _password.addClass("is-invalid"); //bordo rosso textbox
			_password.prev().addClass("icona-rossa"); //colore icona
        }
        else if(_mail.val() == "")
        {
            _mail.addClass("is-invalid"); //bordo rosso textbox
			_mail.prev().addClass("icona-rossa"); //colore icona
        }
        else if(_telefono.val() == "")
        {
            _telefono.addClass("is-invalid"); //bordo rosso textbox
			_telefono.prev().addClass("icona-rossa"); //colore icona
        }
		else
        {
			let user=_username.val();
			//md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();
            let email = _mail.val();
            let phone = _telefono.val();
			let _richiestaRegistrazione = inviaRichiesta("POST", "registrazione.php", { "username":user, "password":pass, "mail": email, "telefono": phone } );
			_richiestaRegistrazione.fail(function(jqXHR, test_status, str_error) {
				if(jqXHR.status == 401)
                { //unauthorized
                    _lblErrore.text(_lblErrore.text() + " Credenziali già in uso");
					_lblErrore.show();
				}
                else
                {
                    error(jqXHR, test_status, str_error);
                }
			});
			_richiestaRegistrazione.done(function(data){
				if(data.ris=="ok") //test inutile
                {
                    /*sessionStorage.setItem("userId", data.cUtente);
                    sessionStorage.setItem("userName", data.nome);*/
                    //alert(data.nome);
                    _lblSuccesso.show();
                    setTimeout(function(){
                        window.location.href = "login.html";
                    }, 1500);
                }	
			});
		}
	}	
	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	});
    _lblSuccesso.children("button").on("click", function(){
        _lblSuccesso.hide();
	});
});