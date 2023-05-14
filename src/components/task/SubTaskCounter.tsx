import { Task } from '@/app/types'
import React from 'react'

export function SubTaskCounter({ task } : { task: Task | null}) {
  return (
    <>
      {`Subtasks (${task?.subtasks.filter((subtask: any) => subtask.isCompleted).length} of ${
        task?.subtasks.length
      })`}
    </>
  )
}
