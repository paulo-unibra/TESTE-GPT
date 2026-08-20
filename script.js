const year = document.querySelector("#year");
year.textContent = `© ${new Date().getFullYear()} — Recife, Brasil`;

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${index * 120}ms`;
  observer.observe(element);
});

const visual = document.querySelector(".hero-visual");
visual.addEventListener("pointermove", event => {
  const bounds = visual.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  visual.querySelector(".core").style.transform =
    `translate(${x * 12}px, ${y * 12}px)`;
});

visual.addEventListener("pointerleave", () => {
  visual.querySelector(".core").style.transform = "translate(0, 0)";
});