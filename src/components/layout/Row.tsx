import React from 'react';

type RowProps = React.HTMLProps<HTMLDivElement>;

export function Row({ ...props }: RowProps) {
  const { className, children } = props ?? {};

  return (
    <div
      className={`relative col-span-12 col-start-0 w-screen 
      2xl:col-span-12
      ${className ?? ''}
    `}
    >
      {children}
    </div>
  );
}
