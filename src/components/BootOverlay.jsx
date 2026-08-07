import { useEffect, useRef } from "react";
import { flashGlitch, typeLine } from "../glitch";

const BOOT_LINES = [
  "> initialisation du portfolio...",
  "> chargement des modules...",
  "> configuration du système...",
  "> accès autorisé ✓",
];

function BootOverlay({ onDone }) {
  const textRef = useRef(null);
  const fillRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function runBoot() {
      await new Promise((r) => setTimeout(r, 300));

      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        if (fillRef.current) {
          fillRef.current.style.width = ((i + 1) / BOOT_LINES.length) * 100 + "%";
        }
        await typeLine(textRef.current, BOOT_LINES[i], 16);
        if (cancelled) return;
        if (i < BOOT_LINES.length - 1) await new Promise((r) => setTimeout(r, 380));
        if (i === 1) await flashGlitch(4);
        if (cancelled) return;
      }

      await flashGlitch(8, 90);
      if (cancelled) return;
      overlayRef.current.classList.add("done");
      setTimeout(onDone, 450);
    }

    runBoot();
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <div id="boot-overlay" ref={overlayRef}>
      <pre className="glitch glitch-boot" data-text="LOADING...">
        LOADING...
      </pre>
      <div className="boot-sub">
        <span ref={textRef}></span>
        <span className="blink">▌</span>
      </div>
      <div id="boot-bar">
        <div id="boot-fill" ref={fillRef}></div>
      </div>
    </div>
  );
}

export default BootOverlay;