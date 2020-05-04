let _table = $("table");
$(document).ready(function(){
    //Download Chart Image
    document.getElementById("download").addEventListener('click', function(){
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("lineChart").toDataURL("image/jpg");
        /*get download button (tag: <a></a>) */
        var a =  document.getElementById("download");
        /*insert chart image url to download button (tag: <a></a>) */
        a.href = url_base64jp;
    });
    
    
    let _selectSector = $("#selectSector");
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
            //alert(labels);
			//data["data"]["labels"] = labels;
            //alert(data["data"]["labels"]);
            /*l = 0;
            $.getJSON("http://localhost:3000/sector", function(dataSector){
                for(let val in dataSector[sector][labels[l++]])
                {
                    //values[v++] = val;
                    //alert(val);
                    values.push(val);
                    
                }
            });
            data["data"]["datasets"]["data"][0] = values;
            /*for(let val in data["data"]["datasets"])
            {
                console.log(val);
            }*/
            //let myChart = new Chart(ctx,data);
        });
        
        
    });
    
    
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