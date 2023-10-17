import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { CreateTaskRequest, Task } from "src/api/tasks";
import { TaskForm, type TaskFormProps } from "src/components/TaskForm";

const TITLE_INPUT_ID = "task-title-input";
const DESCRIPTION_INPUT_ID = "task-description-input";
const SAVE_BUTTON_ID = "task-save-button";

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

/**
 * The callback below runs after each test (see
 * https://jestjs.io/docs/api#aftereachfn-timeout). Often you'll want to run
 * `jest.clearAllMocks()` or `jest.resetAllMocks()`, which reset the state of
 * all mock functions (https://jestjs.io/docs/jest-object#jestclearallmocks).
 * In this case, we only want to "clear" because "reset" also removes any mock
 * implementations, which we want to leave alone for this test suite.
 */
afterEach(() => {
  jest.clearAllMocks();
});

/**
 * A `describe` block helps to group tests together, but is not required. You
 * can nest them--for example, we could have something like:
 * ```js
 * describe("BigComponent", () => {
 *   describe("functionality 1", () => {
 *     it("does something", () => {
 *       // ...
 *     })
 *     // ...
 *   });
 *   describe("functionality 2", () => {
 *     // ...
 *   })
 * })
 * ```
 * See https://jestjs.io/docs/api#describename-fn for more information.
 */
describe("TaskForm", () => {
  /**
   * The `it` function defines a single test. The first parameter is a string
   * that names the test. You should follow the format below (starts with a
   * present-tense verb) so it reads as "it renders create mode", where "it"
   * refers to "TaskForm". The second parameter is a function that contains the
   * code for the test.
   *
   * This first test simply renders the component, then checks that the "New
   * task" title is present. These kinds of tests are easy to write but do not
   * verify any actual behavior/logic, so be sure to write additional tests like
   * the third and fourth ones in this file.
   *
   * `it` is actually an alias for the `test` function. We use `it` so it reads
   * like a sentence.
   *
   * See https://jestjs.io/docs/api#testname-fn-timeout for more information.
   */
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
    expect(screen.queryByTestId(TITLE_INPUT_ID)).toHaveValue("My task");
    expect(screen.queryByTestId(DESCRIPTION_INPUT_ID)).toHaveValue("Very important");
  });

  it("calls submit handler with edited fields", async () => {
    // sometimes a test needs to be asynchronous, for example if we need to wait
    // for component state updates
    mountComponent({
      mode: "edit",
      task: mockTask,
    });
    fireEvent.change(screen.getByTestId(TITLE_INPUT_ID), { target: { value: "Updated title" } });
    fireEvent.change(screen.getByTestId(DESCRIPTION_INPUT_ID), {
      target: { value: "Updated description" },
    });
    const saveButton = screen.getByTestId(SAVE_BUTTON_ID);
    fireEvent.click(saveButton);
    expect(mockCreateTask).toHaveBeenCalledTimes(1);
    expect(mockCreateTask).toHaveBeenCalledWith({
      title: "Updated title",
      description: "Updated description",
    });
    await waitFor(() => {
      // If the test ends before all state updates and rerenders occur, we'll
      // get a warning about updates not being wrapped in an `act(...)`
      // function. We resolve it here by waiting for the save button to be
      // re-enabled.
      // `@testing-library/react` actually uses `act()` in its helper functions,
      // like `fireEvent.click()`, so we'll only see that warning when there's
      // something missing in our tests.
      // More info: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
      expect(saveButton).toBeEnabled();
    });
  });

  it("catches invalid title", async () => {
    mountComponent({ mode: "create" });
    const saveButton = screen.getByTestId(SAVE_BUTTON_ID);
    fireEvent.click(saveButton);
    expect(mockCreateTask).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });
  });
});
