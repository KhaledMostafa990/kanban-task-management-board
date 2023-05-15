import React from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  submitBtn?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'warning';
  isDisabled?: boolean;
  withIcon?: boolean;
  iconSmall?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  submitBtn,
  type,
  isDisabled,
  withIcon,
  iconSmall,
  onClick,
  ...props
}: ButtonProps) {
  const disabled = isDisabled && 'opacity-25';
  const textColor = type === 'secondary' ? 'text-primary-base' : 'text-white';
  const HovereColor =
    type === 'primary'
      ? 'hover:bg-btn-primary-hover'
      : type === 'secondary'
      ? 'hover:bg-btn-secondary-hover'
      : 'hover:bg-btn-danger-hover';

  const bgColor =
    type === 'primary'
      ? 'bg-btn-primary'
      : type === 'secondary'
      ? 'bg-btn-secondary'
      : 'bg-btn-danger';

  return (
    <>
      <button
        className={`relative flex items-center justify-center gap-1 rounded-full px-3 py-2
        text-body-sm font-bold transition-all duration-500 md:px-5 md:py-2.5
        ${HovereColor} ${textColor} ${bgColor} ${disabled} 
        ${isDisabled && 'cursor-not-allowed hover:bg-btn-primary'}
        ${props.className}
        `}
        type={submitBtn ? 'submit' : 'button'}
        onClick={onClick}
        disabled={isDisabled}
      >
        {type === 'primary' && withIcon ? (
          <span className="hidden md:order-2 md:inline">{children}</span>
        ) : (
          <span className="order-2">{children}</span>
        )}

        <div
          className={`inline-flex max-h-min items-center justify-center md:order-1 md:max-h-[3px] md:max-w-[3px]`}
        >
          {withIcon && (
            <>
              {iconSmall ? (
                <span className="text-primary-base">+</span>
              ) : (
                <>
                  <svg
                    className="md:hidden"
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFF"
                      d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                    />
                  </svg>
                  <span className="hidden md:block">+</span>
                </>
              )}
            </>
          )}
        </div>
      </button>
    </>
  );
}
