document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       1. SLIDER PRINCIPAL
    ========================= */
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const slidesContainer = document.querySelector(".slides");
    const totalSlides = slides.length;

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

    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);

    setInterval(nextSlide, 5000);


    /* =========================
       2. MENÚ MOBILE
    ========================= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });


    /* =========================
       3. SLIDER DE CARDS (SEDES)
    ========================= */
    const slider = document.getElementById("slider-cx");
    const izquierda = document.querySelector(".fizquierda");
    const derecha = document.querySelector(".fderecha");
    const card = slider?.querySelector(".sede-card");

    function getScrollAmount(){
        const gap = 25;
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


    /* =========================
       4. CLICK EN CARDS (MÓVIL)
    ========================= */
    if(window.innerWidth <= 768){

        const cards = document.querySelectorAll(".sede-card");

        cards.forEach(card => {
            card.addEventListener("click", () => {

                cards.forEach(c => {
                    if(c !== card) c.classList.remove("activo");
                });

                card.classList.toggle("activo");
            });
        });
    }

const items = document.querySelectorAll(".item");

/* imagen inicial en el activo */
const first = document.querySelector(".item.active");
if(first){
    first.style.backgroundImage = `url(${first.dataset.img})`;
}

/* click */
items.forEach(item => {

    item.addEventListener("click", () => {

        items.forEach(i => {
            i.classList.remove("active");
            i.style.backgroundImage = "none";
        });

        item.classList.add("active");
        item.style.backgroundImage = `url(${item.dataset.img})`;

    });

});

});