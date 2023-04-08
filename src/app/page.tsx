import { useState } from 'React';

import { ButtonPrimary, Overlay } from '@/components/base';
import { Row } from '@/components/layout';
import { boards } from '@/app/store/data.json';

export default function Home() {
  const boardColumns = boards[0].columns;
  const [modelOpen, setModelOpen] = useState(true);

  return (
    <>
      <section className="h-full w-full">
        <div className="container h-full min-h-max lg:w-full 2xl:w-[1111px]">
          <Row className="h-[calc(100vh-141px)] overflow-scroll">
            {boardColumns.length === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                <h2 className="text-center text-lg font-bold text-text-muted">
                  This board is empty. Create a new column to get started.
                </h2>
                <ButtonPrimary withIcon>Add New Column</ButtonPrimary>
              </div>
            ) : (
              <div className="flex h-full gap-6">
                {boardColumns.map((column: any) => (
                  <BoardColumn key={column.id} column={column} />
                ))}

                <div className="relative top-[53px] flex h-full min-w-[280px] items-center justify-center rounded-md bg-gradient-to-b from-background-primary">
                  <button className="flex items-center justify-center gap-3 text-xl text-text-muted">
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#828FA3"
                        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      />
                    </svg>
                    New Column
                  </button>
                </div>
              </div>
            )}
          </Row>
        </div>
      </section>

      {modelOPen && (
        <>
          <div>
            <Overlay />
          </div>
        </>
      )}
    </>
  );
}

function BoardColumn({ column }: any) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base font-bold text-text-muted">
        {column.name} ({column.tasks.length})
      </h2>

      <div className="flex flex-col gap-4">
        {column.tasks.map((task: any) => (
          <div
            key={task.id}
            className="flex w-[280px] max-w-[280px] flex-col gap-2.5 rounded-md bg-background-primary px-3 py-4"
          >
            <h3 className="text-base font-bold text-text-base">{task.title}</h3>
            <p className="text-sm text-text-muted">
              {`${task.subtasks.filter((subtask: any) => subtask.isCompleted).length} `}
              of
              {` ${task.subtasks.length} `}
              subtasks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
