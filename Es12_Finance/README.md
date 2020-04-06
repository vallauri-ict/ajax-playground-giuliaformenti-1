## Esercizio 12 finance

In questo esercizio viene utilizzata una **API** che restituisce diversi dati riguardanti numerose aziende
con cui viene riempita la tabella principale e attraverso una **combo box** si sceglie l'azienda di cui visualizzare i dati.

I file presenti sono:
- **index.html** che contiene la struttura principale del progetto e quindi la tabella e la combo box
- **index.css** che contiene gli stili applicati
- **index.js** che contiene le istruzioni principali e in particolare:
    - il richiamo della procedura che riempie la tabella ogni volta che viene scelta un'azienda
    '''javascript
    _select.on("change", function(){
        getGlobalQuotes(this.value);
    });
    '''
    - costruzione dell'url con il codice dell'azienda scelta
    '''javascript
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=Y7N76EITT7V7O285";
    '''
    - costruzione della tabella dal json che contiene i dati dell'azienda scelta
    '''javascript
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
    });
    '''
    
###### Creato da Giulia Formenti 4B INF
