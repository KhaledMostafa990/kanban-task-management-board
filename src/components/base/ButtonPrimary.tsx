import React from 'react';

export function ButtonPrimary({
  children,
  classes,
  isDisabled,
  withIcon,
  onClick,
}: {
  children: React.ReactNode;
  classes?: string;
  isDisabled?: boolean;
  withIcon?: boolean;
  onClick?: () => void;
}) {
  const disabled = isDisabled ? 'bg-primary-light' : 'bg-primary-base';
  return (
    <>
      <button
        className={`Capitalize relative flex items-center gap-6
        rounded-full text-white ${disabled} md:y-3 bg-primary-base py-2 px-3
        transition-all duration-500 md:px-5 md:py-2.5
        ${classes}        
      `}
        onClick={onClick}
      >
        <span className="hidden md:inline">{children}</span>
        <div className={`flex h-full items-center justify-center`}>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
          </svg>
        </div>
      </button>
    </>
  );
}
