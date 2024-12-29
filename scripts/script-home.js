const slides = document.querySelectorAll('.promo-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let slideInterval;

// Funcție pentru preîncărcarea imaginilor
function preloadImages() {
  slides.forEach(slide => {
    const img = slide.querySelector('.promo-image');
    if (img && img.src) {
      const image = new Image();
      image.src = img.src;
    }
  });
}

// Funcție pentru afișarea unui slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

// Funcție pentru slide automat
function startAutoSlide() {
  slideInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }, 5000); // Schimbare la fiecare 5 secunde
}

// Funcție pentru oprirea slide-ului automat
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Adăugare event listeners pentru dot-uri
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
  });
});

// Preîncărcăm imaginile și pornim slider-ul automat
preloadImages();
startAutoSlide();