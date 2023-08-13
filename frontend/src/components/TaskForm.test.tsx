import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskForm, type TaskFormProps } from "src/components/TaskForm";

const mockHandleSubmit = jest.fn();

function mountComponent(props: TaskFormProps) {
  render(<TaskForm {...props} />);
}

afterEach(() => {
  jest.resetAllMocks();
});

describe("TaskForm", () => {
  it("renders create mode", () => {
    mountComponent({ mode: "create", onPressSubmit: mockHandleSubmit });
    expect(screen.queryByText("New task")).toBeInTheDocument();
  });

  it("renders edit mode", () => {
    mountComponent({
      mode: "edit",
      task: {
        title: "My task",
        description: "Very important",
        isChecked: false,
        dateCreated: new Date(),
      },
      onPressSubmit: mockHandleSubmit,
    });
    expect(screen.queryByText("Edit task")).toBeInTheDocument();
    expect(screen.queryByLabelText("Title")).toHaveValue("My task");
    expect(screen.queryByLabelText("Description")).toHaveValue("Very important");
  });

  it("calls submit handler with edited fields", () => {
    mountComponent({
      mode: "edit",
      task: {
        title: "My task",
        description: "Very important",
        isChecked: false,
        dateCreated: new Date(),
      },
      onPressSubmit: mockHandleSubmit,
    });
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated title" } });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated description" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Updated title",
        description: "Updated description",
        isChecked: false,
      }),
    );
  });
});
