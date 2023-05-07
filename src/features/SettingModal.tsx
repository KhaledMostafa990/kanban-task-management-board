'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { openBoardModal } from '@/app/store/boardSlice';
import { useEscapeListener } from '@/hooks/useEscapeListener';

export function SettingModal({
  isOpen,
  settingList,
  dataId,
  columnId,
  onOpenSettings,
}: {
  isOpen: boolean;
  settingList: string[];
  dataId?: string;
  columnId?: string;
  onOpenSettings: () => void;
}) {
  const dispatch = useAppDispatch();
  const onOpenSetting = (settingName: string) => {
    dispatch(
      openBoardModal(settingName.charAt(0).toLowerCase() + settingName.slice(1).split(' ').join('')),
    );
  };
  useEscapeListener({isModelOpen: isOpen, toggleFunction: onOpenSettings});
  return (
    <>
      {/* settings icon */}
      <button onClick={onOpenSettings}>
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fillRule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
      </button>

      {/* settings list */}
      <ul
        className={`${isOpen && 'active'}
          absolute top-[calc(100%+2rem)] right-0 z-50 flex w-[200px] translate-x-[150%]
          flex-col gap-4 bg-background-primary p-3 opacity-0
          transition-transform [&.active]:translate-x-0 [&.active]:opacity-100`
        }
      >
        {settingList?.map((setting, index) => (
          <li
            key={setting}
            className={`${index % 2 === 0 ? 'text-text-muted' : 'text-secondary-base'}`}
          >
            <button 
              tabIndex={isOpen ? 0 : -1}
              onClick={() => onOpenSetting(setting)}>{setting}</button>
          </li>
        ))}
      </ul>
    </>
  );
}
