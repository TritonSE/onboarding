import React, { useState } from "react";
import { createTask, type Task } from "src/api/tasks";
import { Button, TextField } from "src/components";
import styles from "src/components/TaskForm.module.css";

export interface TaskFormProps {
  mode: "create" | "edit";
  task?: Task;
}

/**
 * A simple way to handle error states in the form. We'll keep a
 * `TaskFormErrors` object in the form's state, initially empty. Before we
 * submit a request, we'll check each field for problems. For each invalid
 * field, we set the corresponding field in the errors object to true, and the
 * corresponding input component will show its error state if the field is true.
 * Look at where the `errors` object appears below for demonstration.
 *
 * In the MVP, the only possible error in this form is that the title is blank.
 * You'll add another field which will have more complex potential errors.
 */
interface TaskFormErrors {
  title?: boolean;
}

/**
 * The form that creates or edits a Task object. In the MVP, this is only
 * capable of creating Tasks.
 *
 * @param props.mode Controls how the form renders and submits
 * @param props.task Optional initial data to populate the form with (such as
 * when we're editing an existing task)
 */
export function TaskForm({ mode, task }: TaskFormProps) {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(task?.description || "");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleSubmit = () => {
    // first, do any validation that we can on the frontend
    setErrors({});
    if (!title) {
      setErrors({ title: true });
      return;
    }
    setLoading(true);
    createTask({ title, description }).then((result) => {
      if (result.success) {
        // clear the form
        setTitle("");
        setDescription("");
      } else {
        // You should always clearly inform the user when something goes wrong.
        // In this case, we're just doing an `alert()` for brevity, but you'd
        // generally want to show some kind of error state or notification
        // within your UI. If the problem is with the user's input, then use
        // the error states of your smaller components (like the `TextField`s).
        // If the problem is something we don't really control, such as network
        // issues or an unexpected exception on the server side, then use a
        // banner, modal, popup, or similar.
        alert(result.error);
      }
      setLoading(false);
    });
  };

  const formTitle = mode === "create" ? "New task" : "Edit task";

  return (
    <div className={styles.form}>
      <span className={styles.formTitle}>{formTitle}</span>
      <div className={styles.formRow}>
        <TextField
          className={styles.textField}
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={errors.title}
        />
        <TextField
          className={`${styles.textField} ${styles.stretch}`}
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button kind="primary" label="Save" disabled={isLoading} onClick={handleSubmit} />
      </div>
    </div>
  );
}
