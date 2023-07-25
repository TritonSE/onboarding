import React from "react";
import styles from "src/components/TextField.module.css";

export interface TextFieldProps extends Omit<React.ComponentProps<"input">, "type" | "className"> {
  label: string;
  error?: boolean;
  className?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error = false, className, ...props },
  ref,
) {
  let wrapperClass = styles.wrapper;
  if (className) {
    wrapperClass += ` ${className}`;
  }
  let inputClass = styles.input;
  if (error) {
    inputClass += ` ${styles.error}`;
  }
  return (
    <div className={wrapperClass}>
      <label className={styles.label}>
        <p>{label}</p>
        <input ref={ref} type="text" className={inputClass} {...props} />
      </label>
    </div>
  );
});
