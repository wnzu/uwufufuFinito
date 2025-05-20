
let filmInGioco = JSON.parse(localStorage.getItem("filmInGioco")) || [];

let cartellaImmagini = localStorage.getItem("cartellaImmagini") || 'images/';

let estensione = localStorage.getItem("estensione") || '.jpg';

let vincitoriRound = [];

let numeroFilm = parseInt(localStorage.getItem("numeroFilm"));

// Variabile che tiene traccia di quanti film sono attualmente in gioco nel round
let nFilm = numeroFilm;

let matchNumero = 1;




function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funzione principale
function startGame() {

    shuffleArray(filmInGioco);

    // Funzione interna che gestisce la visualizzazione dei film
    function mostraSfida() {

        let infoRound = document.getElementById("infoRound");
        if (infoRound) {
            infoRound.textContent = "Round " + nFilm + " Match " + matchNumero;
        }

        //un solo vincitore rimasto -> fine del torneo
        if (filmInGioco.length == 0 && vincitoriRound.length == 1) {
            let vincitore = vincitoriRound[0];

            
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

            
            let imgVincitore = document.createElement('img');
            imgVincitore.src = cartellaImmagini + vincitore[2] + estensione;
            imgVincitore.classList.add("imgVinci");


            
            let titoloVincitore = document.createElement('h2');
            titoloVincitore.textContent = "Il vincitore è: \n" + vincitore[0];
            titoloVincitore.classList.add('titolo-vincitore');

            
            let bottoneHome = document.createElement('button');
            bottoneHome.classList.add("bottoneHome");
            bottoneHome.textContent = "Torna alla Home";
            bottoneHome.onclick = function () {
                window.location.href = "Scelta.html";
            };

            
            let containerVincitore = document.createElement('div');
            containerVincitore.classList.add("container-vincitore");

            containerVincitore.appendChild(titoloVincitore);
            containerVincitore.appendChild(imgVincitore);
            containerVincitore.appendChild(bottoneHome);
            document.body.appendChild(containerVincitore);

            return; // interrompi la funzione
        }

        // Se il round è finito ma ci sono più vincitori
        if (filmInGioco.length == 0) {
            if (vincitoriRound.length > 1) {
                filmInGioco = vincitoriRound; 
                vincitoriRound = [];         
                nFilm = nFilm / 2;            
                matchNumero = 1;             
                shuffleArray(filmInGioco);   
                mostraSfida();               
            }
        }

        
        let film1 = filmInGioco[0];
        let film2 = filmInGioco[1];

        // // Crea elementi immagine per i due film
        let img1 = document.createElement('img');
        img1.src = cartellaImmagini + film1[2] + estensione;

        let img2 = document.createElement('img');
        img2.src = cartellaImmagini + film2[2] + estensione;


        
        let titoloImg1 = document.createElement('div');
        titoloImg1.textContent = film1[0];
        titoloImg1.style.paddingTop = "15px";
        titoloImg1.style.textAlign = 'center';

        let titoloImg2 = document.createElement('div');
        titoloImg2.textContent = film2[0];
        titoloImg2.style.paddingTop = "15px";
        titoloImg2.style.textAlign = 'center';

        
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

        // Imposta gli eventi click per scegliere l'immagine

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

    window.location.href = "Scelta.html";
});


let canvas = document.getElementById('background');
let ctx = canvas.getContext('2d');


let width, height;


function resize() {
    width = window.innerWidth;  
    height = window.innerHeight;  
    canvas.width = width;  
    canvas.height = height;  
}
resize();  
window.addEventListener('resize', resize);  


class SpaceStar {
    constructor() {
        this.reset();  
    }

   
    reset() {
        this.x = Math.random() * width;  
        this.y = Math.random() * height;  
        this.radius = Math.random() * 2;  
        this.alpha = Math.random() * 0.8 + 0.2;  
        this.speedY = Math.random() * 0.2 + 0.05;  
    }

    
    update() {
        this.y += this.speedY;  

       
        if (this.y > height) {
            this.x = Math.random() * width;
            this.y = 0;
        }
    }

    
    draw() {
        ctx.beginPath(); 
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;  
        ctx.shadowColor = "white";  
        ctx.shadowBlur = 6; 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  
        ctx.fill(); 
    }
}


const spaceStars = [];
const STAR_COUNT = 200;  


for (let i = 0; i < STAR_COUNT; i++) {
    spaceStars.push(new SpaceStar());
}


function animateSpace() {

    ctx.fillStyle = "#000011";
    ctx.fillRect(0, 0, width, height);

   
    spaceStars.forEach(star => {
        star.update();
        star.draw();
    });

    
    requestAnimationFrame(animateSpace);
}


animateSpace();

