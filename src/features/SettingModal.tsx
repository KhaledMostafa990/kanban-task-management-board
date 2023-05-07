'use client';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { openBoardModel, setActiveTask } from '@/app/store/boardSlice';

export function SettingModal({
  isOpen: boardSettingOpen,
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
  const activeTask = useAppSelector((state) => state.boardSidebar.activeTask);

  const onOpenSetting = (settingName: string) => {
    dispatch(
      openBoardModel(
        settingName.charAt(0).toLowerCase() + settingName.slice(1).split(' ').join(''),
      ),
    );
  };
  return (
    <>
      <ul
        className={`${
          boardSettingOpen && 'active'
        } absolute top-[calc(100%+2rem)] right-0 z-50 flex w-[200px] translate-x-[150%]
            flex-col gap-4 bg-background-primary p-3 opacity-0 transition-transform [&.active]:translate-x-0 [&.active]:opacity-100`}
      >
        {settingList?.map((setting, index) => (
          <li
            key={setting}
            className={`${index % 2 === 0 ? 'text-text-muted' : 'text-secondary-base'}`}
          >
            <button onClick={() => onOpenSetting(setting)}>{setting}</button>
          </li>
        ))}
      </ul>

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
    </>
  );
}
