import React from 'react';

export function Overlay({ overlayRef, onClick }: { overlayRef?: any; onClick?: () => void }) {
  return (
    <div
      ref={overlayRef}
      onClick={onClick}
      className="active fixed left-0 top-0 z-40 h-screen w-screen transition-all duration-500 [&.active]:h-screen [&.active]:bg-black/40"
    />
  );
}
