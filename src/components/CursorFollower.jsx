import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  'a, button, .hamburger, .theme-toggle, .skill-card, .project-card, .about-chips span, .contact-item';

const FOLLOW = 0.18;
const SETTLE = 0.1;

function CursorFollower() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let visible = false;

    function frame() {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      if (Math.abs(target.x - pos.x) < SETTLE && Math.abs(target.y - pos.y) < SETTLE) {
        pos.x = target.x;
        pos.y = target.y;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function hide() {
      visible = false;
      el.classList.remove("is-visible", "is-hover");
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = target.x;
        pos.y = target.y;
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        el.classList.add("is-visible");
      }
      start();
    }

    function onOver(e) {
      const hit = e.target instanceof Element && e.target.closest(HOVER_SELECTOR);
      el.classList.toggle("is-hover", Boolean(hit));
    }

    function onVisibility() {
      if (document.hidden) hide();
    }

    el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      el.classList.remove("is-visible", "is-hover");
    };
  }, []);

  return (
    <div className="cursor-follower" ref={ref} aria-hidden="true">
      <div className="cursor-ring"></div>
    </div>
  );
}

export default CursorFollower;