import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { CreateTaskRequest, Task } from "src/api/tasks";
import { TaskForm, type TaskFormProps } from "src/components/TaskForm";

/**
 * Some of our tests will verify that `TaskForm` calls the correct functions
 * when the user takes certain actions, like clicking the Save button. This mock
 * function replaces `createTask` from `src/api/tasks` so we can (1) check
 * whether that API function gets called and (2) prevent our test from trying to
 * send an actual HTTP request. Because we know how `createTask` is used in the
 * `TaskForm`, it's safe to just make this mock return `{ success: true }`--we
 * don't need to rewrite a full implementation unless that's required.
 *
 * See https://jestjs.io/docs/mock-functions for more info about mock functions.
 */
const mockCreateTask = jest.fn((_params: CreateTaskRequest) => Promise.resolve({ success: true }));

/**
 * The `jest.mock()` function allows us to replace the exports of another
 * module. In this case, because `TaskForm` calls `createTask()` directly, we
 * can't pass in our mock function as a prop, so we use `jest.mock()` to replace
 * `createTask` from `src/api/tasks` with the mock function. Thus, if
 * `TaskForm` is being rendered by one of these Jest tests (as opposed to a
 * real browser) and it tries to call `createTask()`, it will run the code that
 * we provide below instead.
 *
 * See https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options for
 * more info about mocking modules.
 */
jest.mock("src/api/tasks", () => ({
  // this doesn't work if we just use `mockCreateTask` directly, exact reason
  // unknown, so we wrap it in a normal function
  createTask: (params: CreateTaskRequest) => mockCreateTask(params),
}));

/**
 * A fake Task object to use in tests
 */
const mockTask: Task = {
  _id: "task123",
  title: "My task",
  description: "Very important",
  isChecked: false,
  dateCreated: new Date(),
};

/**
 * Renders the `TaskForm` component for use in Jest tests
 */
function mountComponent(props: TaskFormProps) {
  render(<TaskForm {...props} />);
}

afterEach(() => {
  // This callback runs after each test (see
  // https://jestjs.io/docs/api#aftereachfn-timeout). Often you'll want to
  // run `jest.clearAllMocks()` or `jest.resetAllMocks()`, which reset the state
  // of all mock functions (see
  // https://jestjs.io/docs/jest-object#jestclearallmocks). In this case, we
  // only want to "clear" because "reset" also removes any mock implementations,
  // which we want to leave alone for this test suite.
  jest.clearAllMocks();
});

describe("TaskForm", () => {
  it("renders create mode", () => {
    mountComponent({ mode: "create" });
    expect(screen.queryByText("New task")).toBeInTheDocument();
  });

  it("renders edit mode", () => {
    mountComponent({
      mode: "edit",
      task: mockTask,
    });
    expect(screen.queryByText("Edit task")).toBeInTheDocument();
    expect(screen.queryByLabelText("Title")).toHaveValue("My task");
    expect(screen.queryByLabelText("Description")).toHaveValue("Very important");
  });

  it("calls submit handler with edited fields", () => {
    mountComponent({
      mode: "edit",
      task: mockTask,
    });
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated title" } });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated description" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(mockCreateTask).toHaveBeenCalledTimes(1);
    expect(mockCreateTask).toHaveBeenCalledWith({
      title: "Updated title",
      description: "Updated description",
    });
  });

  it("catches invalid title", () => {
    mountComponent({ mode: "create" });
    fireEvent.click(screen.getByText("Save"));
    expect(mockCreateTask).not.toHaveBeenCalled();
  });
});
