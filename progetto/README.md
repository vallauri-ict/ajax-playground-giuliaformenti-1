#Progetto Giulia Formenti 4B INF

Questo progetto simula un sito di vendita di sneakers.
Ogni pagina è presenta il titolo, che riporta sempre alla pagina principale, il tasto Registrati/Login per effettuare la registrazione o
entrare con un account esistente e il carrello(questa funzionalità non è stata implementata correttamente).

Inoltre presenta una barra di ricerca, la quale effettua la ricerca al click del pulsante o alla pressione del tasto invio.
Viene cercato nel database tutto ciò che inizia per la stringa scritta nella textbox e in presenza di un modello, mostra l'elenco dei modelli
che iniziano in quel determinato modo, in presenza di una marca, mostra l'elenco delle scarpe di quella marca. (Es: "stringa" mostra
l'elenco dei modelli inizianti per "stringa"; se non è presente alcun modello, mostra le eventuali marche inizianti per "stringa"; se la ricerca
non produce risultati, viene esplicitato).

Il tasto Resgistrzione/Login permette di loggarsi con un account esistente, mentre cliccando sul tasto Registrati(presente in pagina di login)
si viene reindirizzati ad una pagina che permette la regostrazione. Una volta registrati, cliccando sul tasto "nome"/Logout viene eseguito il logout

In presenza di un elenco di scarpe, cliccando su ogni singolo item, viene aperta una pagina di dettagli relativa all'item scelto.

E' inoltre presente una finestra modale, all'avvio dell'applicazione, che ricorda che gli utenti già resgistrati da tempo godono di uno sconto
su diversi articoli(--> loggandosi con i vari utenti inseriti nel database, si può notare che ognuno ha sconti diversi).
