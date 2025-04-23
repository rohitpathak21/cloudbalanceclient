import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    // Add event listeners when the modal is open
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Cleanup event listeners on unmount or when modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl w-[35%] p-10 shadow-lg ${className}`}
      >
        {/* Header */}
        {header ? (
          <div>{header}</div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <button
              onClick={onClose}
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
