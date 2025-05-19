import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function InlineModal({ isOpen, onClose, title, children }: Readonly<ModalProps>) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isOpen) return; // ne fait rien si modale fermée
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 16 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-1/2 translate-x-[-50%] mt-4 bg-white border shadow-lg rounded p-4 w-80 z-50"
          onClick={(e) => e.stopPropagation()}
          layout
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>

          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}

          <div>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
