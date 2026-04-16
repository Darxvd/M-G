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
        if (!slidesContainer) return;

        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    document.querySelector(".next")?.addEventListener("click", nextSlide);
    document.querySelector(".prev")?.addEventListener("click", prevSlide);

    if (totalSlides > 0) {
        setInterval(nextSlide, 5000);
    }


    /* =========================
       2. MENÚ MOBILE
    ========================= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle?.addEventListener("click", () => {
        navLinks?.classList.toggle("active");
    });


    /* =========================
       3. SLIDER DE CARDS (SEDES)
    ========================= */
    const slider = document.getElementById("slider-cx");
    const izquierda = document.querySelector(".fizquierda");
    const derecha = document.querySelector(".fderecha");
    const card = slider?.querySelector(".sede-card");

    function getScrollAmount() {
        const gap = 25;
        if (!card) return 300; // fallback seguro
        return card.offsetWidth + gap;
    }

    derecha?.addEventListener("click", () => {
        slider?.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });

    izquierda?.addEventListener("click", () => {
        slider?.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });


    /* =========================
       4. CLICK EN CARDS (MÓVIL)
    ========================= */
    if (window.innerWidth <= 768) {
        const cards = document.querySelectorAll(".sede-card");

        cards.forEach(card => {
            card.addEventListener("click", () => {
                cards.forEach(c => {
                    if (c !== card) c.classList.remove("activo");
                });
                card.classList.toggle("activo");
            });
        });
    }


    /* =========================
       5. CLIENTES (HOVER)
    ========================= */
    const items = document.querySelectorAll(".item");

    const first = document.querySelector(".item.active");
    if (first) {
        first.style.backgroundImage = `url(${first.dataset.img})`;
    }

    items.forEach(item => {
        const activar = () => {
            items.forEach(i => {
                i.classList.remove("active");
                i.style.backgroundImage = "none";
            });

            item.classList.add("active");
            item.style.backgroundImage = `url(${item.dataset.img})`;
        };

        item.addEventListener("mouseenter", activar);
        item.addEventListener("click", activar);
    });


    /* =========================
       6. FORMULARIO + CLOUDINARY + NETLIFY
    ========================= */
    const form = document.getElementById("formulario");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre")?.value;
            const dni = document.getElementById("dni")?.value;
            const telefono = document.getElementById("telefono")?.value;
            const correo = document.getElementById("correo")?.value;
            const servicio = document.getElementById("servicio")?.value;
            const file = document.getElementById("archivo")?.files[0];

            // Validación
            if (!file) {
                alert("Sube un archivo");
                return;
            }

            try {
                // ☁️ Subir a Cloudinary
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "yo_correo_02003");

                const res = await fetch("https://api.cloudinary.com/v1_1/dd1i77se5/upload", {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();

                if (!data.secure_url) {
                    throw new Error("Error subiendo archivo");
                }

                // 📧 Enviar a Netlify
                const response = await fetch("/.netlify/functions/enviar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre,
                        dni,
                        telefono,
                        correo,
                        servicio,
                        archivo: data.secure_url
                    })
                });

                if (!response.ok) {
                    throw new Error("Error en Netlify function");
                }

                alert("Cotización enviada correctamente 🚀");
                form.reset();

            } catch (error) {
                console.error(error);
                alert("Hubo un error al enviar. Intenta nuevamente.");
            }
        });
    }

});