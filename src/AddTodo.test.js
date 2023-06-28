import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("MM/DD/YYYY");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "5/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
});

 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("MM/DD/YYYY");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDateOne = "6/31/2023";
  const dueDateTwo = "7/5/2023";
  fireEvent.change(inputTask, { target: { value: "Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDateOne}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "Homework"}});
  fireEvent.change(inputDate, { target: { value: dueDateTwo}});
  fireEvent.click(element);
  const checkDupe = screen.getByText(/Homework/i);
  expect(checkDupe).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });

 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });