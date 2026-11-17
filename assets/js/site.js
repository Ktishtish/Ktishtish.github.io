(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".term-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const path = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".term-nav a[data-path]").forEach((link) => {
    const target = link.getAttribute("data-path");
    if (target === path || (target !== "/" && path.endsWith(target))) {
      link.classList.add("is-active");
    }
  });

  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = Number(el.getAttribute("data-tilt-max") || 8);
    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // Show badge/certificate slots only when their images successfully load
  document.querySelectorAll("[data-cred-media]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;
    const markReady = () => wrap.classList.add("is-ready");
    if (img.complete && img.naturalWidth > 0) markReady();
    else {
      img.addEventListener("load", markReady);
      img.addEventListener("error", () => wrap.remove());
    }
  });

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
})();
