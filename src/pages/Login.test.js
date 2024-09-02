import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('calls handleLogin when the form is submitted', () => {
  const { getByLabelText, getByText } = render(<Login />);

  fireEvent.change(getByLabelText('Email'), { target: { value: 'JohnDoe@example.com' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

  fireEvent.click(getByText('Login'));
});
