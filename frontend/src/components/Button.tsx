import React from "react";
import styles from "src/components/Button.module.css";

export interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  kind?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, kind = "primary", ...props },
  ref,
) {
  let className = styles.button;
  switch (kind) {
    case "primary":
      className += ` ${styles.primary}`;
      break;
    case "secondary":
      className += ` ${styles.secondary}`;
      break;
  }
  return (
    <button ref={ref} className={className} {...props}>
      {label}
    </button>
  );
});
