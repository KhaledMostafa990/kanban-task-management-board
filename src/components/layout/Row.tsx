import React from 'react';

type RowProps = React.HTMLProps<HTMLDivElement>;

export function Row({ ...props }: RowProps) {
  const { className, children } = props ?? {};

  return (
    <div
      className={`relative col-span-10 col-start-2 w-full 
      2xl:col-span-12
      ${className ?? ''}
    `}
    >
      {children}
    </div>
  );
}
