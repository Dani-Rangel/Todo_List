// src/components/FilterBar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FilterBar from './FilterBar';

describe('FilterBar component', () => {
  test('renderiza input y select con valores iniciales', () => {
    render(
      <FilterBar
        filter="all"
        setFilter={() => {}}
        search=""
        setSearch={() => {}}
        darkMode={false}
      />
    );

    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Todas')).toBeInTheDocument();
  });

  test('cambia valor de búsqueda y llama setSearch', () => {
    const mockSetSearch = vi.fn();

    render(
      <FilterBar
        filter="all"
        setFilter={() => {}}
        search=""
        setSearch={mockSetSearch}
        darkMode={false}
      />
    );

    const input = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'hola' } });

    expect(mockSetSearch).toHaveBeenCalledWith('hola');
  });

  test('cambia filtro y llama setFilter', () => {
    const mockSetFilter = vi.fn();

    render(
      <FilterBar
        filter="all"
        setFilter={mockSetFilter}
        search=""
        setSearch={() => {}}
        darkMode={false}
      />
    );

    const select = screen.getByDisplayValue('Todas');
    fireEvent.change(select, { target: { value: 'completed' } });

    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  test('aplica clases para modo oscuro', () => {
    render(
      <FilterBar
        filter="all"
        setFilter={() => {}}
        search=""
        setSearch={() => {}}
        darkMode={true}
      />
    );

    const input = screen.getByPlaceholderText('Buscar...');
    const select = screen.getByDisplayValue('Todas');

    expect(input).toHaveClass('bg-gray-800');
    expect(select).toHaveClass('bg-gray-800');
  });

  test('aplica clases para modo claro', () => {
    render(
      <FilterBar
        filter="all"
        setFilter={() => {}}
        search=""
        setSearch={() => {}}
        darkMode={false}
      />
    );

    const input = screen.getByPlaceholderText('Buscar...');
    const select = screen.getByDisplayValue('Todas');

    expect(input).toHaveClass('bg-white');
    expect(select).toHaveClass('bg-white');
  });
});
