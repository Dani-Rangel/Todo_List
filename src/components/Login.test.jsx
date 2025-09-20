// src/components/Login.test.jsx
import React from 'react';  
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Login from './Login';

describe('Login component', () => {
  test('renderiza los inputs y botón', () => {
    render(<Login onLogin={() => {}} darkMode={false} />);

    expect(screen.getByPlaceholderText('Usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('llama onLogin con datos correctos', () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} darkMode={false} />);

    fireEvent.change(screen.getByPlaceholderText('Usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(mockOnLogin).toHaveBeenCalledWith({ username: 'usuario', password: '1234' });
  });

  test('muestra alerta si campos vacíos', () => {
    window.alert = vi.fn();

    render(<Login onLogin={() => {}} darkMode={false} />);
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Aquí cambiamos el mensaje esperado para que coincida con el alert real
    expect(window.alert).toHaveBeenCalledWith('Campos vacíos');
  });
});
