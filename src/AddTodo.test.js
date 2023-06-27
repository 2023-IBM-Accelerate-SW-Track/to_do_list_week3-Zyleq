import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const addButton = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.click(addButton);
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.click(addButton);

  const historyTasks = screen.getAllByText(/History Test/i);
  expect(historyTasks.length).toBe(1);
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: /Add/i });
  fireEvent.click(addButton);

  const emptyTaskError = screen.getByText(/Task name is required/i);
  expect(emptyTaskError).toBeInTheDocument();
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const addButton = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  const emptyDateError = screen.getByText(/Due date is required/i);
  expect(emptyDateError).toBeInTheDocument();
});

test('test that App component can be deleted through checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const addButton = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(inputTask, { target: { value: "Delete Task" } });
  fireEvent.click(addButton);

  const deleteCheckbox = screen.getByRole('checkbox', { name: /Delete Task/i });
  fireEvent.click(deleteCheckbox);

  const deletedTask = screen.queryByText(/Delete Task/i);
  expect(deletedTask).not.toBeInTheDocument();
});

test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const addButton = screen.getByRole('button', { name: /Add/i });

  // Add a past due task
  fireEvent.change(inputTask, { target: { value: "Past Due Task" } });
  fireEvent.click(addButton);

  const pastDueTask = screen.getByText(/Past Due Task/i);
  const taskCard = pastDueTask.closest('[data-testid]');
  const backgroundColor = taskCard.style.backgroundColor;

  // Check if the background color is different than the default color
  expect(backgroundColor).not.toBe("#ffffffff");
});
