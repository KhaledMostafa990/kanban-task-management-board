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
        className={`relative gap-4 rounded-full text-white md:flex md:items-center
        md:justify-center ${disabled} bg-primary-base p-0 px-3 py-2 transition-all duration-500
         md:gap-1 md:px-5 md:py-2.5
        ${classes}        
      `}
        onClick={onClick}
      >
        <span className="hidden md:order-2 md:inline">{children}</span>

        <div
          className={`flex max-h-min items-center justify-center md:order-1 md:max-h-[3px] md:max-w-[3px]`}
        >
          {withIcon && (
            <svg className="md:hidden" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          )}
          <span className="hidden md:block">+</span>
        </div>
      </button>
    </>
  );
}
