import React from 'react';

export function InputControl({ children }: { children: React.ReactNode }) {
  return <div className="relative flex flex-col gap-2.5">{children}</div>;
}
