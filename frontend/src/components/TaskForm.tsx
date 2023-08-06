import React, { useState } from "react";
import { Button, TextField } from "src/components";
import styles from "src/components/TaskForm.module.css";

interface TaskFormProps {
  mode: "create" | "edit";
  task?: {
    // TODO: define this type separately
    title: string;
    description: string;
    isChecked: boolean;
    dateCreated: Date;
  };
}

interface TaskFormErrors {
  title?: boolean;
}

export function TaskForm({ mode, task }: TaskFormProps) {
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(task?.description || "");
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleSubmit = () => {
    // TODO
    setErrors({ title: true });
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
        <Button kind="primary" label="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
}
