let lastFocusedElement = null; // elemento con foco antes de abrir un modal
let currentSlide = 0;          // testimonio activo del carrusel


/**
•⁠  ⁠Abre WhatsApp con un mensaje predefinido.
*/
function openWhatsApp(message) {
 const phone = "5210000000000";
 const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
 window.open(url, "_blank", "noopener,noreferrer");
}


/**
•⁠  ⁠Abre el modal de un producto y bloquea el scroll del fondo.
*/
function openModal(id) {
 lastFocusedElement = document.activeElement;
 const modal = document.getElementById(id);
 modal.classList.add("is-open");
 document.body.style.overflow = "hidden";
 const closeButton = modal.querySelector(".modal-close");
 if (closeButton) closeButton.focus();
}


/**
•⁠  ⁠Cierra el modal de un producto y devuelve el foco al elemento anterior.
*/
function closeModal(id) {
 const modal = document.getElementById(id);
 modal.classList.remove("is-open");
 document.body.style.overflow = "";
 if (lastFocusedElement) lastFocusedElement.focus();
}


/**
•⁠  ⁠Revela el bloque con el código de descuento.
*/
function revealOffer() {
 document.getElementById("offer-reveal").classList.remove("hidden");
 document.getElementById("offer-button").setAttribute("aria-expanded", "true");
}


/**
•⁠  ⁠Copia el código de descuento al portapapeles.
*/
async function copyDiscount() {
 const feedback = document.getElementById("copy-feedback");
 try {
   await navigator.clipboard.writeText("DULCE10");
   feedback.classList.remove("hidden");
   setTimeout(() => feedback.classList.add("hidden"), 2400);
 } catch (error) {
   feedback.textContent = "Selecciona y copia el código DULCE10";
   feedback.classList.remove("hidden");
 }
}


/**
•⁠  ⁠Mueve el carrusel de testimonios al índice indicado (circular).
*/
function setSlide(index) {
 const slides = 3;
 currentSlide = (index + slides) % slides;


 const track = document.getElementById("testimonial-track");
 track.style.transform = "translateX(-" + (currentSlide * 100) + "%)";


 document.querySelectorAll("#testimonial-dots button").forEach((dot, dotIndex) => {
   const active = dotIndex === currentSlide;
   dot.classList.toggle("active", active);
   dot.setAttribute("aria-current", String(active));
 });
}


document.addEventListener("DOMContentLoaded", () => {
 lucide.createIcons();


 /* ---- Menú móvil ---- */
 const menuToggle = document.getElementById("menu-toggle");
 const mobileMenu = document.getElementById("mobile-menu");


 menuToggle.addEventListener("click", () => {
   const open = mobileMenu.classList.toggle("open");
   menuToggle.setAttribute("aria-expanded", String(open));
   menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
 });


 mobileMenu.querySelectorAll("a").forEach(link => {
   link.addEventListener("click", () => {
     mobileMenu.classList.remove("open");
     menuToggle.setAttribute("aria-expanded", "false");
     menuToggle.setAttribute("aria-label", "Abrir menú");
   });
 });


 /* ---- Cerrar modales al hacer clic fuera del panel ---- */
 document.querySelectorAll(".modal").forEach(modal => {
   modal.addEventListener("click", event => {
     if (event.target === modal) closeModal(modal.id);
   });
 });


 /* ---- Cerrar modales y menú móvil con Escape ---- */
 document.addEventListener("keydown", event => {
   if (event.key === "Escape") {
     const openModalElement = document.querySelector(".modal.is-open");
     if (openModalElement) closeModal(openModalElement.id);


     if (mobileMenu.classList.contains("open")) {
       mobileMenu.classList.remove("open");
       menuToggle.setAttribute("aria-expanded", "false");
     }
   }
 });


 /* ---- Carrusel de testimonios ---- */
  const testimonialPrev = document.getElementById("testimonial-prev");
 const testimonialNext = document.getElementById("testimonial-next");
 const testimonialTrack = document.getElementById("testimonial-track");
 const testimonialDots = document.querySelectorAll("#testimonial-dots button");
 if (testimonialPrev && testimonialNext && testimonialTrack) {
   testimonialPrev.addEventListener("click", () => setSlide(currentSlide - 1));
   testimonialNext.addEventListener("click", () => setSlide(currentSlide + 1));
   testimonialDots.forEach((dot, index) => {
     dot.addEventListener("click", () => setSlide(index));
   });
   let touchStartX = 0;
   testimonialTrack.addEventListener("touchstart", event => {
     touchStartX = event.changedTouches[0].screenX;
   }, { passive: true });
   testimonialTrack.addEventListener("touchend", event => {
     const difference = event.changedTouches[0].screenX - touchStartX;
     if (Math.abs(difference) > 45) setSlide(currentSlide + (difference < 0 ? 1 : -1));
   }, { passive: true });
 }


 /* ---- Animación de aparición al hacer scroll ---- */
 const revealObserver = new IntersectionObserver(entries => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.classList.add("visible");
       revealObserver.unobserve(entry.target);
     }
   });
 }, { threshold: 0.14 });
 document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));


 /* ---- Ocultar el botón flotante de WhatsApp cerca de "Contacto" ---- */
 const contact = document.getElementById("contacto");
 const floatingButton = document.getElementById("whatsapp-float");
 const contactObserver = new IntersectionObserver(entries => {
   floatingButton.classList.toggle("hidden-float", entries[0].isIntersecting);
 }, { threshold: 0.3 });
 contactObserver.observe(contact);
});



