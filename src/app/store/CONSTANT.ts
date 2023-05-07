export const boardFormInfo = [
  {
    label: 'Board Name',
    id: 'board-name',
    type: 'text',
    name: 'name',
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
        required: true,
      },
      {
        type: 'text',
        id: '2',
        name: 'column-2',
        placeholder: 'Doing',
        required: true,
      },
    ],
  },
];

export const TaskFormInfo = [
  {
    label: 'Name',
    type: 'text',
    name: 'name',
    placeholder: 'e.g. Web Design',
    required: true,
  },
  {
    label: 'Desciption',
    type: 'textarea',
    name: 'desciption',
    placeholder: 'How can I help you?',
    required: true,
  },
  {
    label: 'Subtasks',
    inputs: [
      {
        type: 'text',
        name: 'column',
        id: '1',
        placeholder: 'Todo',
        required: true,
      },
      {
        type: 'text',
        name: 'column',
        id: '2',
        placeholder: 'Doing',
        required: true,
      },
    ],
  },
  {
    label: 'Status',
    type: 'select',
    name: 'status',
    value: 'Todo',
    required: true,
    options: [
      {
        value: 'Todo',
      },
    ],
  },
];
