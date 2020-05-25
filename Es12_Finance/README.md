## Esercizio 12 finance

In questo esercizio viene utilizzata una **API** di **AlphaVantage** che restituisce diversi dati riguardanti numerose aziende
con cui viene riempita la tabella principale. e attraverso una **combo box** si sceglie l'azienda di cui visualizzare i dati.

# RICERCA SINGOLA
E' presente una **combo box** nella quale sono inserite alcune aziende; alla scelta di una delle aziende viene inserita nella tabella una singola riga contenente le informazioni interessate. Per questo viene:
- richiamata la procedura che riempie la tabella ogni volta che viene scelta un'azienda
```javascript
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
```
- costruito l'url con il codice dell'azienda scelta
```javascript
let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=Y7N76EITT7V7O285";
```
- richiamata la funzione per la costruzione della tabella dal json che contiene i dati dell'azienda scelta
    ```javascript
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
    ```
    
# RICERCA INCREMENTALE
E' presente una **text box** dove, ogni volta che viene inserito un carattere, vengono inseriti nella tabella i record trovati.
- viene richiamata la funzione per la ricerca dell'azienda, che al suo interno richiama la funzione che crea le righe e quella sopra indicata che inserisce i valori nei record
    ```javascript
    function getSymbolSearch(symbol){
        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + symbol + "&apikey=Y7N76EITT7V7O285";
        $.getJSON(url, function(data){
            console.log(data);
            let ln = 5 - calls;
            _tbody = $("<tbody id='myTBody'>").appendTo(_table);
            isPresent = true;
            for(let i = 0; i < ln; i++)
            {
                createRows(i);
                let symb = data["bestMatches"][i]["1. symbol"];
                getGlobalQuotes(symb, i);
                calls++;
            }
        });
    }
    ```
# CREAZIONE, DOWNLOAD E UPLOAD CHART
E' inoltre presente una **combo box** da cui si può scegliere il settore di cui visualizzare il grafico, che poi è possibile scaricare ed eventualmente salvarlo su Google Drive.
- creazione chart
    ```javascript
    let ctx = document.getElementById('myChart').getContext('2d');
        $.getJSON("http://localhost:3000/chart", function(data){
            $.getJSON("http://localhost:3000/sector",function(dataSector){
                for(let key in dataSector[sector])
                {
                    labels[l] = key;
                    l++;
                    values[v] = dataSector[sector][key].replace("%", "");
                    v++;
                }
			}).done(function(){
                data["data"]["labels"] = labels;
                data["data"]["datasets"][0]["data"] = values;
                data["data"]["datasets"][0]["backgroundColor"] = bgColors;
                data["data"]["datasets"][0]["borderColor"] = bdColors;
                let myChart = new Chart(ctx,data);
            });
            
        });
    ```
- download chart
    ```javascript
    let url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        let a =  document.getElementById("download");
        a.href = url_base64jp;
    ```
- upload su Google Drive
     ```javascript
    if (confirm("Vuoi salvare su Google Drive?"))
            {
                let clientId = "880324532459-2vbntvc7fv5ovtcgm1m5rbc5mektelmn.apps.googleusercontent.com";
				//let redirect_uri = "http://localhost/Es12_Finance/upload.html";
				let redirect_uri = "http://127.0.0.1/Es12_Finance/upload.html";
				let scope = "https://www.googleapis.com/auth/drive";
				let url = "";
				signIn(clientId,redirect_uri,scope,url);
            }
    ```
###### Creato da Giulia Formenti 4B INF
