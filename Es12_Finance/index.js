"use strict"

let _table;
let _tbody;
let isPresent;
let calls = 0;
$(document).ready(function(){
    _table = $("#myTable");
    //let _tbody = $("#myTBody");
    $("#grafico").hide();
    //**********************DOWNLOAD CHART**********************
    document.getElementById("download").addEventListener('click', function(){
        let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        let a =  document.getElementById("download");
        a.href = url_base64jp;
		
        //**********************SAVE ON GOOGLE DRIVE**********************
		setTimeout(function(){
            if (confirm("Vuoi salvare su Google Drive?"))
            {
                let clientId = "880324532459-2vbntvc7fv5ovtcgm1m5rbc5mektelmn.apps.googleusercontent.com";
				//let redirect_uri = "http://localhost/Es12_Finance/upload.html";
				let redirect_uri = "http://127.0.0.1/Es12_Finance/upload.html";
				let scope = "https://www.googleapis.com/auth/drive";
				let url = "";
				signIn(clientId,redirect_uri,scope,url);
            }
		}, 2000);
    }); 
    
    //********************** CHART **********************
    let _selectSector = $("#selectSector");
    let _select = $("#symbols").prop("selectedIndex", "-1");
    _select.on("change", function(){
        if(calls <= 5)
        {
            _tbody = $("<tbody id='myTBody'>").appendTo(_table);
            isPresent = true;
            createRows(0);
            //_table.css("border-color", "red");
            getGlobalQuotes(this.value, 0);
            calls++;
        }
        else
        {
            alert("Puoi fare al massimo 5 chiamate al minuto");
        }
    });
    
    let _txt = $("#txtCompany");
    _txt.keyup(function(){
        if(_txt.val().length > 1)
        {
            if(calls <= 5)
            {
                if(isPresent)
                {
                    _tbody.empty();
                    isPresent = false;
                }

                _select.prop("selectedIndex",-1);
                getSymbolSearch(_txt.val());
            }
            else
            {
                alert("Puoi fare al massimo 5 chiamate al minuto");
            }
        }
    });
    
    $.getJSON("http://localhost:3000/sector", function(data){
        for(let key in data)
        {
            if(key != "Meta Data")
            {
                $("<option>", {
                    text: key,
                    value: key,
                }).appendTo(_selectSector);
            }
        }
        _selectSector.prop("selectedIndex", "-1")
    });
    
    _selectSector.on("change", function(){
        let sector = this.value;
        let values = [];
        let labels = [];
        let bgColors = ["rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)","rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)"];
        let bdColors = ["rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)","rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)"];
        let l = 0;
        let v = 0;
        
        //Creazione chart
        let ctx = document.getElementById('myChart').getContext('2d');
        $.getJSON("http://localhost:3000/chart", function(data){
            $.getJSON("http://localhost:3000/sector",function(dataSector){
                for(let key in dataSector[sector])
                {
                    //alert(l + ") KEY: " + key);
                    labels[l] = key;
                    //alert(labels[l]);
                    l++;
                    values[v] = dataSector[sector][key].replace("%", "");
                    v++;
                    //alert(labels[l]);
                    //alert(key);
                    //labels.push(key);
                }
                
                l--;
                v--;
			}).done(function(){
                data["data"]["labels"] = labels;
                data["data"]["datasets"][0]["data"] = values;
                data["data"]["datasets"][0]["backgroundColor"] = bgColors;
                data["data"]["datasets"][0]["borderColor"] = bdColors;
                let myChart = new Chart(ctx,data);
                //alert(data["data"]["labels"]);
                //alert(data["data"]["datasets"][0]["data"]);
            });
            
        });
        
        
    });
    $("#grafico").show();
    setInterval(function(){
        calls = 0;
    }, 60000);
});

function signIn(clientId,redirect_uri,scope,url){
        // the actual url to which the user is redirected to 
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
        +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
        +"&access_type=offline";
        window.location = url;
		
     }

//**********************RICERCA INCREMENTALE**********************
function getGlobalQuotes(symbol,n)
    {
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=VMSN8M8PZENUR7OR";//chiave gratuita VMSN8M8PZENUR7OR
        $.getJSON(url,
            function (data) {
                let globalQuoteData = data["Global Quote"];
                $("#symbol"+n).text(globalQuoteData["01. symbol"]);
                $("#previousClose"+n).text(globalQuoteData["08. previous close"]);
                $("#open"+n).text(globalQuoteData["02. open"]);
                $("#lastTrade"+n).text(globalQuoteData["05. price"]);
                $("#lastTradeTime"+n).text(globalQuoteData["07. latest trading day"]);
                $("#change"+n).text(globalQuoteData["09. change"]);
                $("#daysLow"+n).text(globalQuoteData["04. low"]);
                $("#daysHigh"+n).text(globalQuoteData["03. high"]);
                $("#volume"+n).text(globalQuoteData["06. volume"]);
            }
        );
    }

function getSymbolSearch(symbol){
    //let _table = $("table");
    let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol + "&apikey=Y7N76EITT7V7O285";
    $.getJSON(url, function(data){
        console.log(data);
        //let _bestMat = data["bestMatches"];
        let ln = 5 - calls;
        _tbody = $("<tbody id='myTBody'>").appendTo(_table);
        isPresent = true;
        for(let i = 0; i < ln; i++)
        {
            //console.log(data["bestMatches"][i]["1. symbol"]);
            
            createRows(i);
            let symb = data["bestMatches"][i]["1. symbol"];
            getGlobalQuotes(symb, i);
            calls++;
        }
    });
}

function createRows(n) {
    let _tr = $("<tr>").appendTo(_tbody);
    $("<td id = symbol" + n + ">").appendTo(_tr);
    $("<td id = lastTrade" + n + ">").appendTo(_tr);
    $("<td id = lastTradeTime" + n + ">").appendTo(_tr);
    $("<td id = change" + n + ">").appendTo(_tr);
    $("<td id = open" + n + ">").appendTo(_tr);
    $("<td id = previousClose" + n + ">").appendTo(_tr);
    $("<td id = daysLow" + n + ">").appendTo(_tr);
    $("<td id = daysHigh" + n + ">").appendTo(_tr);
    $("<td id = volume" + n + ">").appendTo(_tr);
}