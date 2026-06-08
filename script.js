const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const notes = document.querySelector("textarea[name='notes']");
const noteCount = document.querySelector("#note-count");
const form = document.querySelector(".booking-form");
const message = document.querySelector(".form-message");
const heroSlides = [...document.querySelectorAll(".hero__slide")];
const heroDots = [...document.querySelectorAll(".hero__dots span")];
const revealItems = [...document.querySelectorAll(".reveal")];

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

notes?.addEventListener("input", () => {
  noteCount.textContent = notes.value.length;
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "Thanks. Your quote request has been prepared for Sai Car Hire.";
  form.reset();
  noteCount.textContent = "0";
});

if (heroSlides.length > 1) {
  let activeSlide = 0;

  const showSlide = (index) => {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  showSlide(activeSlide);

  window.setInterval(() => {
    activeSlide = (activeSlide + 1) % heroSlides.length;
    showSlide(activeSlide);
  }, 5200);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
