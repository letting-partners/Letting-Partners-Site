"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-lp-animate]");

    // Pre-mark elements already in the viewport as visible before enabling
    // animations — prevents flash of invisible content on initial load.
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 40) {
        el.classList.add("lp-visible");
      }
    });

    // Enable CSS animations only after in-view elements are pre-marked.
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("lp-visible")) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
