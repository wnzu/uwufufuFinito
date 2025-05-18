// Prende l'elenco dei film salvati nel localStorage dalla pagina precedente
let filmInGioco = JSON.parse(localStorage.getItem("filmInGioco")) || [];

let cartellaImmagini = localStorage.getItem("cartellaImmagini") || 'images/';

let estensione = localStorage.getItem("estensione") || '.jpg';

// Array per salvare i film vincitori di ogni match
let vincitoriRound = [];

// Recupera da localStorage il numero totale di film, convertendolo in intero
let numeroFilm = parseInt(localStorage.getItem("numeroFilm"));

// Variabile che tiene traccia di quanti film sono attualmente in gioco nel round
let nFilm = numeroFilm;

// Contatore dei match all'interno di un round
let matchNumero = 1;



// Funzione per mescolare gli elementi di un array in ordine casuale (algoritmo di Fisher–Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // indice casuale
        [array[i], array[j]] = [array[j], array[i]];   // scambia i due elementi
    }
}

// Funzione principale per avviare il gioco
function startGame() {

    // Mescola l'ordine dei film all'inizio del gioco
    shuffleArray(filmInGioco);

    // Funzione interna che gestisce la visualizzazione di una sfida (match)
    function mostraSfida() {
        // Aggiorna le informazioni del round e del match nell'intefaccia
        let infoRound = document.getElementById("infoRound");
        if (infoRound) {
            infoRound.textContent = "Round " + nFilm + " Match " + matchNumero;
        }

        // Caso finale: un solo vincitore rimasto -> fine del torneo
        if (filmInGioco.length == 0 && vincitoriRound.length == 1) {
            let vincitore = vincitoriRound[0]; // prendi il vincitore finale

            // Ottieni riferimenti agli elementi del DOM
            let film1d = document.getElementById("film1");
            let film2d = document.getElementById("film2");
            let versusText = document.querySelector(".versus");
            let x = document.querySelector(".btn-close");

            // Nascondi elementi non più necessari
            film2d.style.display = "none";
            versusText.style.display = "none";
            infoRound.textContent = "";
            x.style.display = "none";

            film1d.innerHTML = "";
            film2d.innerHTML = "";

            // Crea e mostra immagine del vincitore
            let imgVincitore = document.createElement('img');
            imgVincitore.src = cartellaImmagini + vincitore[2] + estensione;
            imgVincitore.classList.add("imgVinci");


            // Crea e mostra titolo del vincitore
            let titoloVincitore = document.createElement('h2');
            titoloVincitore.textContent = "Il vincitore è: \n" + vincitore[0];
            titoloVincitore.classList.add('titolo-vincitore');

            // Crea bottone per tornare alla home
            let bottoneHome = document.createElement('button');
            bottoneHome.classList.add("bottoneHome");
            bottoneHome.textContent = "Torna alla Home";
            bottoneHome.onclick = function () {
                window.location.href = "Scelta.html";
            };

            // Contenitore finale del vincitore
            let containerVincitore = document.createElement('div');
            containerVincitore.classList.add("container-vincitore");

            containerVincitore.appendChild(titoloVincitore);
            containerVincitore.appendChild(imgVincitore);
            containerVincitore.appendChild(bottoneHome);
            document.body.appendChild(containerVincitore);

            return; // interrompi la funzione
        }

        // Se il round è finito ma ci sono più vincitori (serve un nuovo round)
        if (filmInGioco.length == 0) {
            if (vincitoriRound.length > 1) {
                filmInGioco = vincitoriRound; // i vincitori diventano i nuovi film in gioco
                vincitoriRound = [];          // resetta vincitori
                nFilm = nFilm / 2;            // dimezza il numero di film (nuovo round)
                matchNumero = 1;              // resetta il contatore dei match
                shuffleArray(filmInGioco);    // mescola i nuovi film
                mostraSfida();                // inizia nuovo round
            }
        }

        // Prendi i due film da mostrare nel match attuale
        let film1 = filmInGioco[0];
        let film2 = filmInGioco[1];

        // // Crea elementi immagine per i due film
        let img1 = document.createElement('img');
        img1.src = cartellaImmagini + film1[2] + estensione;

        let img2 = document.createElement('img');
        img2.src = cartellaImmagini + film2[2] + estensione;


        // Crea titoli dei film (sotto le immagini)
        let titoloImg1 = document.createElement('div');
        titoloImg1.textContent = film1[0];
        titoloImg1.style.paddingTop = "15px";
        titoloImg1.style.textAlign = 'center';

        let titoloImg2 = document.createElement('div');
        titoloImg2.textContent = film2[0];
        titoloImg2.style.paddingTop = "15px";
        titoloImg2.style.textAlign = 'center';

        // Ottieni i contenitori per i film
        let film1d = document.getElementById("film1");
        let film2d = document.getElementById("film2");

        // Nascondi visivamente i contenitori (per animazione)
        film1d.style.opacity = "0";
        film2d.style.opacity = "0";

        // Dopo un breve delay che serve per i titoli, aggiorna le immagini e mostra di nuovo
        setTimeout(() => {
            film1d.innerHTML = "";
            film2d.innerHTML = "";

            film1d.appendChild(img1);
            film1d.appendChild(titoloImg1);

            film2d.appendChild(img2);
            film2d.appendChild(titoloImg2);

            film1d.style.opacity = "1";
            film2d.style.opacity = "1";
        }, 50);

        // Imposta gli eventi di click per scegliere l'immagine

        img1.addEventListener("click", () => {
            vincitoriRound.push(film1);    // salva il vincitore
            img2.classList.add("fade-out");
            setTimeout(() => {
                filmInGioco.shift(); // rimuovi film1
                filmInGioco.shift(); // rimuovi film2,passando alla coppia successiva
                matchNumero++;// passa al match successivo
                mostraSfida();// chiama di nuovo la funzione
            }, 500);
        });



        img2.addEventListener("click", () => {
            vincitoriRound.push(film2);
            img1.classList.add("fade-out");
            setTimeout(() => {
                filmInGioco.shift();
                filmInGioco.shift();
                matchNumero++;
                mostraSfida();
            }, 500);

        });

    }

    // Avvia il primo match del gioco
    mostraSfida();
}

// Esegue la funzione per iniziare il gioco
startGame();


let comeback = document.querySelector(".btn-close");

comeback.addEventListener("click", () => {

    window.location.href = "scelta.html";
});

// Ottieni l'elemento canvas dal DOM e il suo contesto di rendering 2D
let canvas = document.getElementById('background');
let ctx = canvas.getContext('2d');

// Variabili per memorizzare larghezza e altezza del canvas
let width, height;

// Funzione per ridimensionare il canvas in base alle dimensioni della finestra
function resize() {
    width = window.innerWidth;  // Larghezza della finestra
    height = window.innerHeight;  // Altezza della finestra
    canvas.width = width;  // Imposta la larghezza del canvas
    canvas.height = height;  // Imposta l'altezza del canvas
}
resize();  // Esegui la funzione resize una volta all'inizio
window.addEventListener('resize', resize);  // Aggiorna il canvas quando la finestra viene ridimensionata

// Classe che rappresenta una stella nello spazio
class SpaceStar {
    constructor() {
        this.reset();  // Inizializza la stella con valori casuali
    }

    // Metodo per resettare la posizione e le proprietà della stella
    reset() {
        this.x = Math.random() * width;  // Posizione X casuale
        this.y = Math.random() * height;  // Posizione Y casuale
        this.radius = Math.random() * 2;  // Raggio casuale (0-2px)
        this.alpha = Math.random() * 0.8 + 0.2;  // Trasparenza casuale (0.2-1)
        this.speedY = Math.random() * 0.2 + 0.05;  // Velocità verticale casuale (0.05-0.25)
    }

    // Metodo per aggiornare la posizione della stella
    update() {
        this.y += this.speedY;  // Muovi la stella verso il basso

        // Se la stella esce dallo schermo, riappare in cima con nuove proprietà
        if (this.y > height) {
            this.x = Math.random() * width;
            this.y = 0;
        }
    }

    // Metodo per disegnare la stella sul canvas
    draw() {
        ctx.beginPath();  // Inizia un nuovo percorso di disegno
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;  // Colore bianco con trasparenza
        ctx.shadowColor = "white";  // Colore dell'ombra
        ctx.shadowBlur = 6;  // Sfocatura dell'ombra
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  // Disegna un cerchio
        ctx.fill();  // Riempie il cerchio con il colore specificato
    }
}

// Array per memorizzare tutte le stelle
const spaceStars = [];
const STAR_COUNT = 200;  // Numero totale di stelle

// Crea tutte le stelle e le aggiunge all'array
for (let i = 0; i < STAR_COUNT; i++) {
    spaceStars.push(new SpaceStar());
}

// Funzione principale per l'animazione dello spazio
function animateSpace() {
    // Riempie il canvas con un colore di sfondo scuro (blu notte)
    ctx.fillStyle = "#000011";
    ctx.fillRect(0, 0, width, height);

    // Per ogni stella: aggiorna la posizione e ridisegnala
    spaceStars.forEach(star => {
        star.update();
        star.draw();
    });

    // Richiama la funzione animateSpace al prossimo frame di animazione
    requestAnimationFrame(animateSpace);
}

// Avvia l'animazione
animateSpace();

