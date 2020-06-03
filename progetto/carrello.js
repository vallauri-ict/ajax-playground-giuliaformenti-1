"use strict"

$(document).ready(function() {	
    let _main = $("#main");
	let _cart = $("#cart");
    let list = sessionStorage.getItem("listCarello");
    alert(list);
    if(list != null)
    {
        for(let i = 0; i < list.length; i++)
        {
            let _text = list[i]["marca"] + " " list[i]["modello"];
            $("<li>").prop({"class": "list-group-item"}).text(_text).appendTo(_cart);
        }
    }
    else
    {
        let _h1 = $("<h1>", {
            "text": "Nessun elemento nel carrello",
            "css": {"margin-top": "20px"}
        }).appendTo(_main);
    }
});