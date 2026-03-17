let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;
const slidesContainer = document.querySelector(".slides");

function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function currentSlide(index) {
    showSlide(index);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

/* Automático cada 5 segundos */
setInterval(() => {
    nextSlide();
}, 5000);

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const slider = document.getElementById("slider-cx");
const izquierda = document.querySelector(".fizquierda");
const derecha = document.querySelector(".fderecha");

const card = slider.querySelector(".sede-card");

function getScrollAmount(){
    const gap = 25; // mismo gap de tu CSS
    return card.offsetWidth + gap;
}

derecha.onclick = () => {
slider.scrollBy({
left: getScrollAmount(),
behavior: "smooth"
});
};

izquierda.onclick = () => {
slider.scrollBy({
left: -getScrollAmount(),
behavior: "smooth"
});
};


if(window.innerWidth <= 768){

const cards = document.querySelectorAll(".sede-card");

cards.forEach(card => {

card.addEventListener("click", () => {

cards.forEach(c=>{
if(c !== card){
c.classList.remove("activo");
}
});

card.classList.toggle("activo");

});

});

}
const items = document.querySelectorAll(".item");
const fondo = document.getElementById("fondo");

const first = document.querySelector(".item.active");
fondo.style.backgroundImage = `url(${first.dataset.img})`;

items.forEach(item => {

item.addEventListener("click", () => {

items.forEach(i => i.classList.remove("active"));
item.classList.add("active");

const img = item.dataset.img;
fondo.style.backgroundImage = `url(${img})`;

});

});

const contenedor = document.querySelector(".contenedor");

/* SOLO EN MÓVIL */
if(window.innerWidth <= 768){

contenedor.addEventListener("scroll", () => {

let scrollLeft = contenedor.scrollLeft;
let width = contenedor.clientWidth;

/* detectar card visible */
let index = Math.round(scrollLeft / width);

if(items[index]){

/* quitar activos */
items.forEach(i => i.classList.remove("active"));
items[index].classList.add("active");

/* animación suave */
fondo.style.opacity = "0";

setTimeout(()=>{
fondo.style.backgroundImage = `url(${items[index].dataset.img})`;
fondo.style.opacity = "1";
},200);

}

});

}