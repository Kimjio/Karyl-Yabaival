(() => {
  const n = () => {
    const n = document.body;
    window.innerHeight / window.innerWidth < 9 / 16
      ? n.classList.add("w-longer-than-canvas")
      : n.classList.remove("w-longer-than-canvas");
  };
  document.addEventListener("DOMContentLoaded", () => {
    n();
  }),
    window.addEventListener("resize", () => {
      n();
    });
})();
