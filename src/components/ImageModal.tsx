import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      queueMicrotask(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 5));
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Toolbar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-50" onClick={e => e.stopPropagation()}>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          title="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <span className="text-white text-sm font-medium min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          title="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <button 
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-red-500/80 rounded-full text-white transition-colors ml-2"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking background if we want drag behavior
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            pointerEvents: 'none' // Prevent native drag
          }}
          className="select-none"
        />
      </div>
      
      {/* Caption */}
      {alt && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md max-w-[80vw] truncate pointer-events-none">
          {alt}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageModal;
