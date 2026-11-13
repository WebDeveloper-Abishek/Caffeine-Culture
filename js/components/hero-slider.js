export function setupHeroSlider() {
  const sliderElement = document.querySelector(".hero-slider");
  if (!sliderElement) return;

  const previousButton = sliderElement.parentElement.querySelector("[data-hero-slider-prev]");
  const nextButton = sliderElement.parentElement.querySelector("[data-hero-slider-next]");

  if (!previousButton || !nextButton) {
    throw new Error("Hero slider controls are missing.");
  }

  if (!window.Swiper) {
    console.error("Swiper did not load. The first hero background remains visible.");
    return;
  }

  new window.Swiper(sliderElement, {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
    navigation: {
      prevEl: previousButton,
      nextEl: nextButton,
    },
  });
}
