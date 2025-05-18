// Seleziona tutte le immagini che hanno l'attributo data-url
let immagini = document.querySelectorAll("img[data-url]");

// Per ogni immagine trovata
immagini.forEach(img => {

    img.addEventListener("mouseenter", () => {
        document.body.style.cursor = 'pointer';
    });

    img.addEventListener("mouseleave", () => {
        document.body.style.cursor = 'default';
    });
    // Quando si clicca sull'immagine
    img.addEventListener("click", (e) => {
        e.preventDefault();
        // Previene l'azione predefinita (evita il cambio pagina immediato)

        // Prende il valore dell'attributo data-url dell'immagine cliccata
        let url = img.getAttribute("data-url");

        // Aggiunge la classe fade-out al body per attivare un'animazione di dissolvenza (fade)
        document.body.classList.add("fade-out");

        // Salva nel localStorage con la variabile "tipo", il valore di "url"
        // Serve per passare dati alla pagina successiva
        localStorage.setItem("tipo", url);

        // Dopo 500 millisecondi (tempo in cui si svolge l'animazione fade),
        // cambia la pagina corrente caricando "Scelta.html"
        setTimeout(() => {
            window.location.href = "Scelta.html";
        }, 500);
    });

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

