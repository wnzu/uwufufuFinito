
let immagini = document.querySelectorAll("img[data-url]");


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
       
        let url = img.getAttribute("data-url");
        
        document.body.classList.add("fade-out");

        localStorage.setItem("tipo", url);

        setTimeout(() => {
            window.location.href = "Scelta.html";
        }, 500);
    });

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

