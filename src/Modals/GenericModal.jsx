import React, { useEffect, useRef, useState } from "react";

export default function GenericModal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  header,
  body,
}) {
  const modalRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Match with the CSS transition duration
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-5000 bg-black/50 flex items-center justify-center px-4 overflow-x-hidden overflow-y-auto">
      <div
        ref={modalRef}
        className={`
          bg-white 
          rounded-2xl 
          w-[35%] 
          p-10 
          shadow-lg 
          transform 
          transition-all 
          duration-300 
          ease-in-out
          ${animate ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
          ${className}
        `}
      >
        {/* Header */}
        {header ? (
          <div>{header}</div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <button
              onClick={handleClose}
              className="text-2xl text-gray-500 hover:text-black"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}

        {/* Body */}
        <div>{body || children}</div>
      </div>
    </div>
  );
}
