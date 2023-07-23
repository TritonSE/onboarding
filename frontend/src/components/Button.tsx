import React from "react";
import styles from "src/styles/Button.module.css";

type ButtonProps = React.ComponentProps<"button">;

type OwnProps = {
  label: string;
  kind?: "primary" | "secondary";
};

type Props = OwnProps & ButtonProps;

export function Button({ label, kind = "primary", ...props }: Props) {
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
    <button className={className} {...props}>
      {label}
    </button>
  );
}
