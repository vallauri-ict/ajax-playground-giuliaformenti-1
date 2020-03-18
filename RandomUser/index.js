"use strict";

let nat = "US";
let gender = "all";
let res = "100";

let currentUser;
let index = 0;
let _li;
let title;
let value;

$(function(){
    _li = $("#values_list li");
    title = $("#user_title");
    value = $("#user_value");
    
    $(_li).on("mouseover", function(){
        reset(this);
    });
    $("#new").on("click", function(){
        controllaParametri();
        let param = "results=" + res + "&gender=" + gender + "&nat=" + nat;
        inviaRichiesta(param, aggiornaPagina);
    });
    controllaParametri();
    let param = "results=" + res + "&gender=" + gender + "&nat=" + nat;
    inviaRichiesta(param, aggiornaPagina);
    
    
});

function inviaRichiesta(parametri, callback) {
  $.ajax({
    url: "https://randomuser.me/api/",
    type: "GET",
    data: parametri,
    contentType: "application/x-www-form-unreloaded; charset=UTF-8",
    dataType: "json",
    async: true,
    timrout: 5000,
    success: callback,
    error: function(jqXHR, test_status, str_error) {
      alert("Server error: " + jqHXR.status + " - " + jqHXR.responseText);
    }
  });
}

function aggiornaPagina(data) {
    currentUser = data;
    console.log(currentUser);
    index = 0;
    inserisciCampi(index);
}
    
function reset(sender) {
    for (let i = 0; i < _li.length; i++)
    {
        _li[i].className = _li[i].className.replace(/\bactive\b/, "");
    }
    sender.className += " active";
    $(value).text(sender.getAttribute("data-value"));
    $(title).text(sender.getAttribute("data-title"));
}

function controllaParametri(){
    let _rdbMale = $("#male");
    let _rdbFemale = $("#female");
    let _rdbAll = $("#all");
    let _slidebar = $("#slidebar");
    let _check = $("input[type=checkbox]");
    let _slider = $("#slider");
    
    _rdbMale.on("change", function(){
        gender = _rdbMale.prop("gend");
    });
    _rdbFemale.on("change", function(){
        gender = _rdbMale.prop("gend");
    });
    _rdbAll.on("change", function(){
        gender = _rdbMale.prop("gend");
    });
    
    _slider.on("input", function() {
       $(".number").text(_slider.prop("value"));
       res = _slider.prop("value");
    });
    
    _check.on("click", function(){
       nat += "," + _check.prop("value"); 
    });
    
    $("#btnSx").on("click", function(){
        if(index != 0)
        {
            index--;
            inserisciCampi(index);
        }
    });
    $("#btnDx").on("click", function(){
        if(index < $("slider").prop("value"))
        {
            index++;
            inserisciCampi(index);
        }
    });
    
    $("#btnOk").on("click", function(){
        controllaParametri();
        let param = "results=" + res + "&gender=" + gender + "&nat=" + nat;
        inviaRichiesta(param, aggiornaPagina);
    });
}

function inserisciCampi(index){
    let item = currentUser["results"][index];
    for(let i = 0; i < _li.length; i++)
    {
        if(_li[i].getAttribute("data-label") == "name")
        {
            _li[i].setAttribute("data-value", item["name"]["first"] + " " + item["name"]["last"]);
        }
        else
        {
            if(_li[i].getAttribute("data-label") == "location")
            {
               _li[i].setAttribute("data-value", item["location"]["street"]["number"] + " " + item["location"]["street"]["name"]);
            }
            else
            {
                if(_li[i].getAttribute("data-label") == "birthday")
                {
                    _li[i].setAttribute("data-value", item["dob"]["date"].split('T')[0]);
                }
                else
                {
                    if(_li[i].getAttribute("data-label") == "pass")
                    {
                        _li[i].setAttribute("data-value", item["login"]["password"]);
                    }
                    else
                    {
                        _li[i].setAttribute("data-value", item[_li[i].getAttribute("data-label")]);
                    }
                }
            }
        }
    }
    $("img").prop("src", item["picture"]["large"]);
    reset(_li[0]);
}

function random(min, max) {
    let rnd = Math.floor((max - min + 1) * Math.random()) + min;
    return rnd;
    //return let rnd = Math.floor((max - min + 1) * Math.random()) + min;
}