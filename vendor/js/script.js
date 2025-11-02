function initCarousel() {
  const isMobile = window.innerWidth < 720;

  let itemsPerSlide = 3; // Altijd 3 zichtbaar
  let slideBy = isMobile ? 1 : 1; // Altijd 1 schuiven, ook op mobiel

  const carousel = document.getElementById("multiCarousel");
  const carouselInner = document.getElementById("carouselInner");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const totalItems = document.querySelectorAll(".multi-carousel-item:not(.clone)").length;

  function initializeClones() {
    const originalItems = Array.from(document.querySelectorAll(".multi-carousel-item:not(.clone)"));
    document.querySelectorAll(".clone").forEach((clone) => clone.remove());

    const lastClones = originalItems.slice(-itemsPerSlide).map((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    }).reverse();
    lastClones.forEach((clone) => carouselInner.prepend(clone));

    const firstClones = originalItems.slice(0, itemsPerSlide).map((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    });
    firstClones.forEach((clone) => carouselInner.append(clone));
  }

  function setCarouselHeight() {
    const windowHeight = window.innerHeight;
    const carouselContainer = carousel.closest(".container-fluid");
    const containerRect = carouselContainer ? carouselContainer.getBoundingClientRect() : { top: 0 };
    const availableHeight = windowHeight - containerRect.top - 100;
    const carouselHeight = Math.max(availableHeight, 300);
    document.documentElement.style.setProperty("--carousel-height", `${carouselHeight}px`);
  }

  initializeClones();
  setCarouselHeight();

  let position = itemsPerSlide;
  let isAnimating = false;

  function updateCarouselPosition(animate = true) {
    carouselInner.style.transition = animate ? "transform 0.5s ease" : "none";
    const translateX = (position * -100) / itemsPerSlide;
    carouselInner.style.transform = `translateX(${translateX}%)`;
  }

  updateCarouselPosition(false);

  carouselInner.addEventListener("transitionend", function () {
    isAnimating = false;
    if (position >= totalItems + itemsPerSlide) {
      position = itemsPerSlide + (position - (totalItems + itemsPerSlide));
      updateCarouselPosition(false);
    } else if (position < itemsPerSlide) {
      position = totalItems + position;
      updateCarouselPosition(false);
    }
  });

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    position += slideBy;
    updateCarouselPosition();
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    position -= slideBy;
    updateCarouselPosition();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  let autoAdvanceInterval = setInterval(next, 5000);
  carousel.addEventListener("mouseenter", () => clearInterval(autoAdvanceInterval));
  carousel.addEventListener("mouseleave", () => autoAdvanceInterval = setInterval(next, 5000));
}