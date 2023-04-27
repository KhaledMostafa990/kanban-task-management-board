import React from 'react';
import { ErrorMessage } from 'formik';

export function ErrorMessageWrapper({ input, hasIcon }: { input: string; hasIcon?: boolean }) {
  return (
    <div
      className={`${
        hasIcon ? 'right-10' : 'right-3'
      } absolute top-[50%]  flex translate-y-[-50%] items-center gap-2.5 text-xs italic text-danger`}
    >
      <ErrorMessage name={input}>
        {(msg) => (
          <>
            {msg}
            {/* <Image src={errorIcon} alt="error icon" width={16} height={16} /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <g fill="none" fill-rule="evenodd">
                <circle cx="10" cy="10" r="10" fill="#fafafa" />
                <path fill="#F43030" d="M11 14v2H9v-2h2zm0-9v7H9V5h2z" />
              </g>
            </svg>
          </>
        )}
      </ErrorMessage>
    </div>
  );
}
