'use client';
import { useEffect } from 'react';



export const useEscapeListener = (
  { isModelOpen, toggleFunction }: { isModelOpen: boolean; toggleFunction: () => void; }) => {

  useEffect(() => {
    console.log('isModelOpen', isModelOpen);
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModelOpen)
        toggleFunction();
    };

    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [isModelOpen]);
};
