// src/components/TaskForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskForm from './TaskForm';

describe('TaskForm component', () => {
  test('renderiza input y botón', () => {
    render(<TaskForm onAddTask={() => {}} author="Juan" darkMode={false} />);

    expect(screen.getByPlaceholderText('Nueva tarea')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  test('cambia el valor del input', () => {
    render(<TaskForm onAddTask={() => {}} author="Juan" darkMode={false} />);
    const input = screen.getByPlaceholderText('Nueva tarea');

    fireEvent.change(input, { target: { value: 'Mi tarea' } });
    expect(input.value).toBe('Mi tarea');
  });

  test('llama onAddTask con datos correctos y limpia el input', () => {
    const mockOnAddTask = vi.fn();
    render(<TaskForm onAddTask={mockOnAddTask} author="Juan" darkMode={false} />);
    
    const input = screen.getByPlaceholderText('Nueva tarea');
    const button = screen.getByRole('button', { name: /agregar/i });

    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    fireEvent.click(button);

    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    // Comprobamos que el objeto pasado contenga lo esperado (id es función, se puede ignorar)
    expect(mockOnAddTask.mock.calls[0][0]).toMatchObject({
      title: 'Nueva tarea',
      completed: false,
      author: 'Juan',
    });
    expect(input.value).toBe('');
  });

  test('no llama onAddTask si el input está vacío', () => {
    const mockOnAddTask = vi.fn();
    render(<TaskForm onAddTask={mockOnAddTask} author="Juan" darkMode={false} />);

    const button = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
