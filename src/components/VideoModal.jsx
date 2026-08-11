import { useEffect } from "react";

function VideoModal({ video, title, onClose }) {
  useEffect(() => {
    document.body.classList.add("lock");
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-head">
          <span>{title}</span>
          <button className="video-modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>
        <video src={video} controls autoPlay></video>
      </div>
    </div>
  );
}

export default VideoModal;