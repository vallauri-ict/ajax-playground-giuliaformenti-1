let _table = $("table");
$(document).ready(function(){
    let _select = $("#symbols").prop("selectedIndex", "-1");
    _select.on("change", function(){
        getGlobalQuotes(this.value);
    });
    /*let _txt = $("#txtCompany");
    _txt.keyup(function(){
        if(_txt.val().length > 1)
        {
            getSymbolSeatch(_txt.val());
        }
    });*/
});

function getGlobalQuotes(symbol){
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=Y7N76EITT7V7O285";
    $.getJSON(url, function(data){
        $("#symbol").text(data["Global Quote"]["01. symbol"]);
        let globalQuoteData = data["Global Quote"];
        $("#previousClose").text(globalQuoteData["08. previous close"]);
        $("#open").text(globalQuoteData["02. open"]);
        $("#lastTrade").text(globalQuoteData["05. price"]);
        $("#lastTradeTime").text(globalQuoteData["07. latest trading day"]);
        $("#change").text(globalQuoteData["09. change"]);
        $("#daysLow").text(globalQuoteData["04. low"]);
        $("#daysHigh").text(globalQuoteData["03. high"]);
        $("#volume").text(globalQuoteData["06. volume"]);
        /*let _tr = $("<tr>").appendTo(_table);
        $("<td>").text(data["Global Quote"]["01. symbol"]).appendTo(_tr);
        let globalQuoteData = data["Global Quote"];
        $("<td>").text(globalQuoteData["08. previous close"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["02. open"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["05. price"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["07. latest trading day"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["09. change"]).appendTo(_tr).appendTo(_tr);
        $("<td>").text(globalQuoteData["04. low"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["03. high"]).appendTo(_tr);
        $("<td>").text(globalQuoteData["06. volume"]).appendTo(_tr);*/
    });
}

/*function getSymbolSearch(symbol){
    let _table = $("table");
    let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol + "&apikey=Y7N76EITT7V7O285";
    $.getJSON(url, function(data){
        console.log(data);
        //let _bestMat = data["bestMatches"];
        for(let i = 0; i < data["bestMatches"].length; i++)
        {
            console.log(data["bestMatches"][i]["1. symbol"]);
            let symb = data["bestMatches"][i]["1. symbol"];
            getGlobalQuotes(symb);
            //let _tr = $("<tr>").appendTo(_table);
            //$("<td>").text(data["bestMatches"][i]["1. symbol"]).appendTo(_tr);
            //console.log(data["bestMatches"][i]["1. symbol"]);
            //$("<td>").text(data["bestMatches"][i]["2. name"]).appendTo(_tr);
            //console.log(data["bestMatches"][i]["2. name"]);
        }
    });
}*/