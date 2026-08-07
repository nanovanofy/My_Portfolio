import { useEffect, useRef } from "react";
import { registerCanvas, unregisterCanvas } from "../glitch";

function GlitchCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    registerCanvas(ref.current);
    return () => unregisterCanvas();
  }, []);

  return <canvas id="glitch-canvas" ref={ref} />;
}

export default GlitchCanvas;