// src/components/TaskList.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Creamos variables para espiar las props que recibe el mock TaskItem
let lastProps = null;

// Mock del TaskItem para aislar tests y capturar props
vi.mock('./TaskItem', () => {
  return {
    __esModule: true,
    default: (props) => {
      lastProps = props;
      return <div data-testid="task-item">{props.task.title}</div>;
    },
  };
});

import TaskList from './TaskList';

describe('TaskList component', () => {
  test('muestra mensaje cuando no hay tareas', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
  });

  test('renderiza la lista de tareas', () => {
    const tasks = [
      { id: '1', title: 'Tarea 1', completed: false, author: 'A', date: new Date().toISOString() },
      { id: '2', title: 'Tarea 2', completed: true, author: 'B', date: new Date().toISOString() },
    ];

    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);

    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems).toHaveLength(2);
    expect(taskItems[0]).toHaveTextContent('Tarea 1');
    expect(taskItems[1]).toHaveTextContent('Tarea 2');
  });

  test('pasa correctamente las funciones a cada TaskItem', () => {
    const tasks = [{ id: '1', title: 'Tarea 1', completed: false, author: 'A', date: new Date().toISOString() }];
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(<TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />);

    expect(lastProps.task).toEqual(tasks[0]);
    expect(lastProps.onToggle).toBe(onToggle);
    expect(lastProps.onDelete).toBe(onDelete);
    expect(lastProps.onEdit).toBe(onEdit);
  });
});
