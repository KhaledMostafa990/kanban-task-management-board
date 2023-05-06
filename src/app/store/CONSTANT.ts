export const boardFormInfo = [
  {
    label: 'Board Name',
    id: 'board-name',
    type: 'text',
    name: 'name',
    value: '',
    placeholder: 'e.g. Web Design',
    required: true,
  },
  {
    label: 'Board Columns',
    inputs: [
      {
        type: 'text',
        id: '1',
        name: 'column-1',
        placeholder: 'Todo',
        value: '',
        required: true,
      },
      {
        type: 'text',
        id: '2',
        name: 'column-2',
        placeholder: 'Doing',
        value: '',
        required: true,
      },
    ],
  },
];

export const taskFormInfo = [
  {
    label: 'Title',
    id: 'task-name',
    name: 'title',
    type: 'text',
    value: '',
    placeholder: 'e.g. Web Design',
    required: true,
  },
  {
    label: 'Description',
    id: 'task-description',
    type: 'textarea',
    name: 'description',
    value: '',
    placeholder: 'How can I help you?',
  },
  {
    label: 'Subtasks',
    inputs: [
      {
        type: 'text',
        id: '1',
        name: 'column-1',
        value: '',
        placeholder: 'Todo',
        required: true,
      },
      {
        type: 'text',
        id: '2',
        name: 'column-2',
        placeholder: 'Doing',
        required: true,
        value: '',
      },
    ],
  },
  {
    label: 'Status',
    id: 'task-status',
    type: 'select',
    name: 'status',
    value: 'Todo',
    required: true,
  },
];
