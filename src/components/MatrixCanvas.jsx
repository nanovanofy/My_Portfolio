import { useEffect, useRef } from "react";
import {
  registerMatrix,
  unregisterMatrix,
  resizeMatrix,
  startMatrix,
  setMatrixTheme,
} from "../matrix";

function MatrixCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    registerMatrix(el);
    startMatrix();

    let resizeTimer = 0;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeMatrix, 150);
    }

    const observer = new MutationObserver(() => {
      setMatrixTheme(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      unregisterMatrix();
    };
  }, []);

  return <canvas id="matrix-canvas" ref={ref} aria-hidden="true" />;
}

export default MatrixCanvas;