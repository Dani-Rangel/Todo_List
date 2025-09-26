// src/components/TaskItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TaskItem from './TaskItem';

const mockTask = {
  id: '1',
  title: 'Tarea de prueba',
  completed: false,
  author: 'Juan',
  date: new Date('2023-01-01T10:00:00').toISOString(),
};

describe('TaskItem component', () => {
  test('renderiza título, autor y fecha', () => {
    render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText(/Por:Juan/)).toBeInTheDocument();
    expect(screen.getByText(/\| 1\/1\/2023, 10:00:00/)).toBeInTheDocument(); // formato puede variar según locale
  });

  test('botón toggle y delete llaman las funciones respectivas', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={onToggle} onDelete={onDelete} onEdit={() => {}} />);

    fireEvent.click(screen.getByText('Pendiente'));
    expect(onToggle).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByText('Eliminar'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  test('cambia a modo edición y actualiza título', () => {
    const onEdit = vi.fn();

    render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} onEdit={onEdit} />);

    fireEvent.click(screen.getByText('Editar'));

    const input = screen.getByDisplayValue('Tarea de prueba');
    fireEvent.change(input, { target: { value: 'Título editado' } });

    fireEvent.click(screen.getByText('Guardar'));

    expect(onEdit).toHaveBeenCalledWith('1', 'Título editado');
    expect(screen.queryByDisplayValue('Título editado')).not.toBeInTheDocument();
  });

  test('no guarda título vacío', () => {
    const onEdit = vi.fn();

    render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} onEdit={onEdit} />);

    fireEvent.click(screen.getByText('Editar'));

    const input = screen.getByDisplayValue('Tarea de prueba');
    fireEvent.change(input, { target: { value: '   ' } });

    fireEvent.click(screen.getByText('Guardar'));

    expect(onEdit).not.toHaveBeenCalled();
  });

  test('muestra texto correcto en botón toggle según estado', () => {
    const completedTask = { ...mockTask, completed: true };

    const { rerender } = render(
      <TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />
    );
    expect(screen.getByText('Pendiente')).toBeInTheDocument();

    rerender(<TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('Completar')).toBeInTheDocument();
  });
});
