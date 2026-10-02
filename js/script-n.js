const contadores = document.querySelectorAll(".contador");
const seccionCifras = document.querySelector(".cifras");

let animacionRealizada = false;

const iniciarContadores = () => {

    contadores.forEach(contador => {

        const objetivo = Number(contador.dataset.target);
        const duracion = 1300;
        const inicio = performance.now();

        const actualizar = (tiempoActual) => {

            const tiempoTranscurrido = tiempoActual - inicio;
            const progreso = Math.min(tiempoTranscurrido / duracion, 1);

            const valorActual = Math.floor(progreso * objetivo);

            contador.textContent = valorActual.toLocaleString("es-PE");

            if (progreso < 1) {
                requestAnimationFrame(actualizar);
            } else {
                contador.textContent = objetivo.toLocaleString("es-PE");
            }
        };

        requestAnimationFrame(actualizar);
    });
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting && !animacionRealizada) {

            animacionRealizada = true;

            iniciarContadores();

            observer.unobserve(seccionCifras);
        }

    });

}, {
    threshold: 0.3
});

observer.observe(seccionCifras);